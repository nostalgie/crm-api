const { addDays, addWeeks, addMonths, format } = require('date-fns')
const periods = require('../constants/periods')
const { Ticket, Customer, Employee, Update } = require('../data-access/DAOs')
const { userType } = require('../constants/userTypes')
const { DATE_FORMAT } = require('../constants')

const createTicket = async (user, ticketInfo) => {
  const seniorAdmin = await Employee.getSeniorAdminForCustomer(user.id)

  const ticket = {
    customerId: user.id,
    newExecutorId: seniorAdmin.id,
    customerFirstName: ticketInfo.firstName,
    customerLastName: ticketInfo.lastName,
    customerNumber: ticketInfo.phoneNumber,
    description: ticketInfo.description,
    type: ticketInfo.type
  }

  try {
    const ticketResult = await Ticket.create(ticket)

    return { id: ticketResult.id }
  } catch (e) {
    console.log(e)
  }
}

const getTickets = async (user, { period, startDate = new Date(), endDate, state, page = 1 }) => {
  const isCustomer = user.type === userType.CUSTOMER
  let idsForTickets

  if (isCustomer) {
    idsForTickets = user.id
  } else {
    const customers = await Customer.getDependantCustomers(user.id)
    idsForTickets = customers.map(customer => customer.id)
  }

  if (period) {
    startDate = format(startDate, DATE_FORMAT)
    switch (period) {
      case periods.DAY: {
        endDate = format(addDays(new Date(), 1), DATE_FORMAT)
        break
      }
      case periods.WEEK: {
        endDate = format(addWeeks(new Date(), 1), DATE_FORMAT)
        break
      }
      case periods.MONTH: {
        endDate = format(addMonths(new Date(), 1), DATE_FORMAT)
        break
      }
      case periods.CUSTOM: {
        endDate = format(endDate, DATE_FORMAT)
        break
      }
    }
  } else {
    startDate = null
    endDate = null
  }

  const queryParams = {
    startDate,
    endDate,
    page,
    state,
    ids: idsForTickets
  }

  const tickets = await Ticket.getByState(user.id, isCustomer, queryParams)

  // const userTypeIds = {
  //   employee: [],
  //   customer: []
  // }

  // for (let ticket of tickets) {
  //   Object.keys(userType)
  //     .forEach(key =>
  //       userTypeIds[userType[key]]
  //         .push(
  //           ...Array.from(
  //             new Set(
  //               ticket.Updates
  //                 .filter(update => update.userType === userType[key])
  //                 .map(update => update.userId)
  //             )
  //           )
  //         )
  //     )
  // }

  // const usersInfo = await Promise.all([
  //   Employee.getEmployeesForUpdates(userTypeIds[userType.EMPLOYEE]),
  //   Customer.getCustomersForUpdates(userTypeIds[userType.CUSTOMER])
  // ])

  // const sortedUpdates = {
  //   employee: usersInfo[0].map(info => (
  //     { [info.id]: {
  //       firstName: info.firstName,
  //       lastName: info.lastName,
  //       role: info.EmployeeRole.name
  //     } }
  //   )),
  //   customer: usersInfo[1].map(info => (
  //     { [info.id]: {
  //       name: info.name
  //     } }
  //   ))
  // }

  const ticketsToSend = tickets.map((ticket) => ({
    id: ticket.id,
    type: ticket.type,
    firstName: ticket.customerFirstName,
    lastName: ticket.customerLastName,
    phoneNumber: ticket.customerNumber,
    description: ticket.description,
    createdAt: format(ticket.created_at, DATE_FORMAT),
    // updatedAt: ticket.updated_at,
    // isFinished: ticket.isFinished,
    rating: ticket.rating
    // updates: ticket.Updates.map(update => {
    // const userInfo = sortedUpdates[update.userType]
    //   .find(info => +Object.keys(info)[0] === update.userId)[update.userId]

    // return {
    //   id: update.id,
    //   message: update.message,
    //   createdAt: update.created_at,
    //   userInfo: {
    //     type: update.userType,
    //     ...userInfo
    //   }
    // }
    // })
  }))

  return { tickets: ticketsToSend }
}

const updateTicket = async (user, updateInfo) => {
  const { ticketId, executorId, newExecutorId, message } = updateInfo
  const update = {
    userType: user.type,
    userId: user.id,
    ticketId: ticketId,
    message: message
  }

  const createdUpdate = await Update.create(update)

  if (newExecutorId) {
    await Ticket.updateExecutor(ticketId, executorId, newExecutorId)
  }
  return {
    id: createdUpdate.id
  }
}

const finishTicket = (ticketId) => {
  return Ticket.finishTicket(ticketId)
}

const rateTicket = (ticketId, rating) => {
  return Ticket.rateTicket(ticketId, Number(rating))
}

module.exports = {
  createTicket,
  getTickets,
  updateTicket,
  finishTicket,
  rateTicket
}

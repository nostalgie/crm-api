const { addDays, addWeeks, addMonths, format } = require('date-fns')
const periods = require('../constants/periods')
const { Ticket, Customer, Employee, Update } = require('../data-access/DAOs')
const { userType } = require('../constants/userTypes')
const { DATE_FORMAT, PAGE_SIZE } = require('../constants')

const createTicket = async (user, ticketInfo) => {
  const seniorAdmin = await Employee.getSeniorAdminForCustomer(user.id)

  const ticket = {
    customerId: ticketInfo.customerId || user.id,
    executorTo: seniorAdmin.id,
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

const getTickets = async (user, { period, startDate, endDate = format(addDays(new Date(), 1), DATE_FORMAT), state, page = 1, role, customer }) => {
  const isCustomer = user.type === userType.CUSTOMER
  let idsForTickets

  if (isCustomer) {
    idsForTickets = user.id
  } else {
    const customers = await Customer.getDependentCustomers(user.id)
    idsForTickets = customers.map(customer => customer.id)
  }

  if (period) {
    startDate = format(startDate, DATE_FORMAT)
    switch (period) {
      case periods.DAY: {
        startDate = format(addDays(new Date(), -1), DATE_FORMAT)
        break
      }
      case periods.WEEK: {
        startDate = format(addWeeks(new Date(), -1), DATE_FORMAT)
        break
      }
      case periods.MONTH: {
        startDate = format(addMonths(new Date(), -1), DATE_FORMAT)
        break
      }
      case periods.CUSTOM: {
        startDate = format(startDate, DATE_FORMAT)
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
    ids: idsForTickets,
    roleTo: role,
    customerId: customer
  }

  const tickets = await Ticket.getByState(user.id, isCustomer, queryParams)

  const ticketsToSend = tickets.rows.map((ticket) => ({
    id: ticket.id,
    type: ticket.type,
    firstName: ticket.customerFirstName,
    lastName: ticket.customerLastName,
    phoneNumber: ticket.customerNumber,
    description: ticket.description,
    createdAt: format(ticket.created_at, DATE_FORMAT),
    rating: ticket.rating
  }))

  const pages = Math.ceil(tickets.count / PAGE_SIZE)

  return {
    tickets: ticketsToSend,
    pages
  }
}

const getTicketInfo = async (ticketId) => {
  const ticket = await Ticket.getTicketInfo(ticketId)

  const usersByType = {
    employee: [],
    customer: []
  }

  Object.keys(userType)
    .forEach(key =>
      usersByType[userType[key]]
        .push(
          ...Array.from(
            new Set(
              ticket.Updates
                .filter(update => update.userType === userType[key])
                .map(update => update.userId)
            )
          )
        )
    )

  const users = await Promise.all([
    Employee.getEmployeesForUpdates(usersByType[userType.EMPLOYEE]),
    Customer.getCustomersForUpdates(usersByType[userType.CUSTOMER])
  ])

  const updatesWithUsers = {
    employee: users[0].map(info => (
      {
        [info.id]: {
          firstName: info.firstName,
          lastName: info.lastName,
          role: info.EmployeeRole.name
        }
      }
    )),
    customer: users[1].map(info => (
      {
        [info.id]: {
          name: info.name
        }
      }
    ))
  }

  const ticketToSend = {
    id: ticket.id,
    type: ticket.type,
    firstName: ticket.customerFirstName,
    lastName: ticket.customerLastName,
    phoneNumber: ticket.customerNumber,
    description: ticket.description,
    createdAt: format(ticket.created_at, DATE_FORMAT),
    updatedAt: format(ticket.updated_at, DATE_FORMAT),
    isFinished: ticket.isFinished,
    rating: ticket.rating,
    updates: ticket.Updates.map(update => {
      const userInfo = updatesWithUsers[update.userType]
        .find(info => +Object.keys(info)[0] === update.userId)[update.userId]

      return {
        id: update.id,
        message: update.message,
        createdAt: update.created_at,
        userInfo: {
          type: update.userType,
          ...userInfo
        }
      }
    })
  }

  return { ticket: ticketToSend }
}

const updateTicket = async (user, updateInfo) => {
  const { ticketId, executorId: newExecutorId, message } = updateInfo
  const update = {
    userType: user.type,
    userId: user.id,
    ticketId: ticketId,
    message: message
  }

  const createdUpdate = await Update.create(update)

  if (newExecutorId) {
    await Ticket.updateExecutor(ticketId, user.id, newExecutorId)
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
  getTicketInfo,
  updateTicket,
  finishTicket,
  rateTicket
}

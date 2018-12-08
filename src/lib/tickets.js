const { Ticket, Customer, Employee, Update } = require('../data-access')
const responseTypes = require('../constants/responseTypes')
const { userType } = require('../constants/userTypes')
const Response = require('../responses/Response')

const createTicket = async (user, ticketInfo) => {
  const seniorAdmin = await Employee.getSeniorAdminForCustomer(user.id)

  const ticket = {
    customerId: user.id,
    executorId: seniorAdmin.id,
    customerFirstName: ticketInfo.firstName,
    customerLastName: ticketInfo.lastName,
    customerNumber: ticketInfo.phoneNumber,
    description: ticketInfo.description,
    type: ticketInfo.type
  }

  try {
    const ticketResult = await Ticket.create(ticket)

    return new Response({ ...responseTypes.CREATE_SUCCESS, payload: { id: ticketResult.id } })
  } catch (e) {
    console.log(e)
    return new Response(responseTypes.COMMON_ERROR)
  }
}

const getTickets = async (user, state) => {
  const isCustomer = user.type === userType.CUSTOMER
  let idsForTickets

  if (isCustomer) {
    idsForTickets = user.id
  } else {
    const customers = await Customer.getDependantCustomers(user.id)
    idsForTickets = customers.map(customer => customer.id)
  }

  const tickets = await Ticket.getByState(state, isCustomer, idsForTickets)

  const userTypeIds = {
    employee: [],
    customer: []
  }

  for (let ticket of tickets) {
    Object.keys(userType)
      .forEach(key =>
        userTypeIds[userType[key]]
          .push(
            ...Array.from(
              new Set(
                ticket.updates
                  .filter(update => update.userType === userType[key])
                  .map(update => update.userId)
              )
            )
          )
      )
  }

  const usersInfo = await Promise.all([
    Employee.getEmployeesForUpdates(userTypeIds[userType.EMPLOYEE]),
    Customer.getCustomersForUpdates(userTypeIds[userType.CUSTOMER])
  ])

  const sortedUpdates = {
    employee: usersInfo[0].map(info => (
      { [info.id]: {
        firstName: info.firstName,
        lastName: info.lastName,
        role: info.emp_role.name
      } }
    ))[0],
    customer: usersInfo[1].map(info => (
      { [info.id]: {
        name: info.name
      } }
    ))[0]
  }

  const ticketsToSend = tickets.map((ticket) => ({
    id: ticket.id,
    type: ticket.type,
    firstName: ticket.customerFirstName,
    lastName: ticket.customerLastName,
    phoneNumber: ticket.customerNumber,
    description: ticket.description,
    createdAt: ticket.created_at,
    updatedAt: ticket.updated_at,
    updates: ticket.updates.map(update => ({
      id: update.id,
      message: update.message,
      createdAt: update.created_at,
      userInfo: {
        type: update.userType,
        ...sortedUpdates[update.userType][update.userId]
      }
    }))
  }))

  return new Response({ ...responseTypes.SUCCESS, payload: { tickets: ticketsToSend } })
}

const updateTicket = async (user, updateInfo) => {
  const { ticketId, executorId, message } = updateInfo
  const update = {
    userType: user.type,
    userId: user.id,
    ticketId: ticketId,
    message: message
  }

  const createdUpdate = await Update.create(update)

  if (executorId) {
    await Ticket.updateExecutor(ticketId, executorId)
  }
  return {
    id: createdUpdate.id
  }
}

const finishTicket = (ticketId) => {
  return Ticket.finishTicket(ticketId)
}

module.exports = {
  createTicket,
  getTickets,
  updateTicket,
  finishTicket
}

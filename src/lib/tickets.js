const { Ticket } = require('../data-access')
const responseTypes = require('../constants/responseTypes')
const Response = require('../responses/Response')

const createTicket = async (user, ticketInfo) => {
  const ticket = {
    customerId: user.id,
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

const getTickets = async (userId, filter) => {
  const tickets = await Ticket.getByFilter(filter, userId)

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
      createdAt: update.created_at
    }))
  }))

  return new Response({ ...responseTypes.SUCCESS, payload: { tickets: ticketsToSend } })
}

module.exports = {
  createTicket,
  getTickets
}

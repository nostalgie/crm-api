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
    const result = await Ticket.create(ticket)

    return new Response({ ...responseTypes.CREATE_SUCCESS, payload: { id: result.id } })
  } catch (e) {
    console.log(e)
    return new Response(responseTypes.COMMON_ERROR)
  }
}

module.exports = {
  createTicket
}

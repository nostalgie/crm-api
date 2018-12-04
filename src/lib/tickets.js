const { Ticket } = require('../data-access')
// const responseTypes = require('../constants/responseTypes')
// const Response = require('../responses/Response')

const createTicket = async (user, ticketInfo) => {
  const result = await Ticket.create(
    user.id,
    ticketInfo.firstName,
    ticketInfo.lastName,
    ticketInfo.phoneNumber,
    ticketInfo.description,
    ticketInfo.type
  )

  console.log(result)
}

module.exports = {
  createTicket
}

const HttpCodes = require('http-status-codes')

module.exports = {
  AuthorizationError: {
    name: 'Authorization Error',
    code: HttpCodes.UNAUTHORIZED
  },
  TicketError: {
    name: 'Ticket Error',
    code: HttpCodes.BAD_REQUEST
  }
}

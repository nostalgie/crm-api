// const { Op } = require('sequelize')
const Ticket = require('../models/Ticket')

class TicketDAO {
  create (ticket) {
    return Ticket.create(ticket)
  }
}

module.exports = TicketDAO

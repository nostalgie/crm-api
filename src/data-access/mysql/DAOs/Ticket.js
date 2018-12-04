// const { Op } = require('sequelize')
const Ticket = require('../models/Ticket')

class TicketDAO {
  create (
    customerId,
    customerFirstName,
    customerLastName,
    customerNumber,
    description,
    type
  ) {
    return Ticket.create({ type, customerFirstName, customerLastName, customerNumber, description })
  }
}

module.exports = TicketDAO

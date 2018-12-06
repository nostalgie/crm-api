const { Op } = require('sequelize')
const Ticket = require('../models/Ticket')
const Update = require('../models/Update')
const UpdateDAO = new (require('../DAOs/Update'))()

const ticketFilters = require('../../../constants/ticketFilters')

class TicketDAO {
  create (ticket) {
    return Ticket.create(ticket)
  }

  async getOpenTickets (userId) {
    const options = {
      where: {
        customerId: {
          [Op.eq]: userId
        },
        rating: {
          [Op.eq]: null
        },
        isFinished: {
          [Op.eq]: false
        }
      },
      include: [
        {
          model: Update,
          required: false
        }
      ]
    }

    const tickets = await Ticket.findAll(options)
    return tickets
  }

  getByFilter (filter, userId) {
    switch (filter) {
      case ticketFilters.OPEN: {
        return this.getOpenTickets(userId)
      }
    }
  }
}

module.exports = TicketDAO

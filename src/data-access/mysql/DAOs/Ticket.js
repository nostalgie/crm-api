const { Op } = require('sequelize')
const Ticket = require('../models/Ticket')
const Update = require('../models/Update')
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
        }
      },
      include: [
        {
          model: Update,
          //     // through: {
          where: {
            isFinishing: {
              [Op.eq]: null
            }
          },
          required: false
          //   }
        }
      ]
    }

    return Ticket.findAll(options)
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

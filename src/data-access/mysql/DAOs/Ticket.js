const { Op } = require('sequelize')
const Ticket = require('../models/Ticket')
const Update = require('../models/Update')

const ticketStates = require('../../../constants/ticketStates')
const { userType } = require('../../../constants/userTypes')

class TicketDAO {
  create (ticket) {
    return Ticket.create(ticket)
  }

  getOpenTicketsOptions () {
    const whereOptions = {
      rating: {
        [Op.eq]: null
      },
      isFinished: {
        [Op.eq]: false
      }
    }

    return whereOptions
  }

  getAwaitingTicketsOptions () {
    const whereOptions = {
      rating: {
        [Op.eq]: null
      },
      isFinished: {
        [Op.eq]: true
      }
    }

    return whereOptions
  }

  getClosedTicketsOptions () {
    const whereOptions = {
      rating: {
        [Op.ne]: null
      },
      isFinished: {
        [Op.eq]: true
      }
    }

    return whereOptions
  }

  async getByState (state, isCustomer, idsForTickets) {
    let options = {
      include: [
        {
          model: Update,
          required: false
        }
      ]
    }

    switch (state) {
      case ticketStates.OPEN: {
        options.where = this.getOpenTicketsOptions()
        break
      }
      case ticketStates.AWAITING_REVIEW: {
        options.where = this.getAwaitingTicketsOptions()
        break
      }
      case ticketStates.CLOSED: {
        options.where = this.getClosedTicketsOptions()
        break
      }
    }

    options.where.customerId = isCustomer
      ? { [Op.eq]: idsForTickets }
      : { [Op.in]: idsForTickets }

    return Ticket.findAll(options)
  }
}

module.exports = new TicketDAO()

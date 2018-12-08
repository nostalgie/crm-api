const { Op } = require('sequelize')
const Ticket = require('../models/Ticket')
const Update = require('../models/Update')

const ticketStates = require('../../../constants/ticketStates')

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

  updateExecutor (ticketId, executorId) {
    const fieldsToUpdate = {
      executorId
    }
    const options = {
      where: {
        id: {
          [Op.eq]: ticketId
        }
      }
    }

    return Ticket.update(fieldsToUpdate, options)
  }

  finishTicket (ticketId) {
    const fieldsToUpdate = {
      isFinished: true
    }
    const options = {
      where: {
        id: {
          [Op.eq]: ticketId
        }
      }
    }

    return Ticket.update(fieldsToUpdate, options)
  }

  rateTicket (ticketId, rating) {
    const fieldsToUpdate = {
      rating
    }
    const options = {
      where: {
        id: {
          [Op.eq]: ticketId
        }
      }
    }

    return Ticket.update(fieldsToUpdate, options)
  }
}

module.exports = new TicketDAO()

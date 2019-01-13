const { Op } = require('sequelize')

const ticketStates = require('../../constants/ticketStates')

class TicketDAO {
  constructor (db) {
    this.db = db
  }

  create (ticket) {
    return this.db.Ticket.create(ticket)
  }

  getOpenTicketsOptions (userId) {
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

  async getByState (userId, state, isCustomer, idsForTickets) {
    let options = {
      include: [
        {
          model: this.db.Update,
          required: false
        }
      ]
    }

    switch (state) {
      case ticketStates.OPEN: {
        options.where = this.getOpenTicketsOptions(userId)
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

    if (isCustomer) {
      options.where.customerId = {
        [Op.eq]: idsForTickets
      }
    } else {
      options.where.customerId = {
        [Op.in]: idsForTickets
      }
      options.where.executorId = {
        [Op.eq]: userId
      }
    }

    return this.db.Ticket.findAll(options)
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

    return this.db.Ticket.update(fieldsToUpdate, options)
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

    return this.db.Ticket.update(fieldsToUpdate, options)
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

    return this.db.Ticket.update(fieldsToUpdate, options)
  }
}

module.exports = TicketDAO

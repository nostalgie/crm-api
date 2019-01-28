const { Op } = require('sequelize')

const ticketStates = require('../../constants/ticketStates')
const { PAGE_SIZE } = require('../../constants')

class TicketDAO {
  constructor (db) {
    this.db = db
  }

  create (ticket) {
    return this.db.Ticket.create(ticket)
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

  async getByState (userId, isCustomer, queryParams) {
    const {
      startDate,
      endDate,
      page,
      state,
      ids: idsForTickets
    } = queryParams

    let options = {
      attributes: [
        'id',
        'type',
        'customerFirstName',
        'customerLastName',
        'customerNumber',
        'description',
        'rating',
        'created_at'
      ],
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE
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

    if (isCustomer) {
      options.where.customerId = {
        [Op.eq]: idsForTickets
      }
    } else {
      options.where.customerId = {
        [Op.in]: idsForTickets
      }
      options.where.executorTo = {
        [Op.eq]: userId
      }
    }

    if (startDate) {
      options.where.created_at = {
        [Op.between]: [ startDate, endDate ]
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

const { Op } = require('sequelize')
const getOptionsByState = require('../utils/getOptionsByState')

const { PAGE_SIZE } = require('../../constants')

class TicketDAO {
  constructor (db) {
    this.db = db
  }

  create (ticket) {
    return this.db.Ticket.create(ticket)
  }

  async getByState (userId, isCustomer, queryParams) {
    const {
      startDate,
      endDate,
      page,
      state,
      ids: idsForTickets,
      roleTo
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

    options = getOptionsByState(state)

    if (roleTo) {
      options = options(this.db, userId, roleTo)
      console.log(options.include[0].include[0])
    } else if (isCustomer) {
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

  updateExecutor (ticketId, oldExecutorId, newExecutorId) {
    const fieldsToUpdate = {
      executorFrom: oldExecutorId,
      executorTo: newExecutorId
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
      isFinished: true,
      executorFrom: null
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

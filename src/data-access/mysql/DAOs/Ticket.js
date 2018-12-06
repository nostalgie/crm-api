const { Op } = require('sequelize')
const Ticket = require('../models/Ticket')
const Update = require('../models/Update')
const CustomerDAO = new (require('./Customer'))()

const ticketStates = require('../../../constants/ticketStates')
const { userType } = require('../../../constants/userTypes')

class TicketDAO {
  create (ticket) {
    return Ticket.create(ticket)
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

  getAwaitingTicketsOptions (userId) {
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

  getClosedTicketsOptions (userId) {
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

  async getByState (state, user) {
    const isCustomer = user.role === userType.CUSTOMER
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
        options.where = this.getOpenTicketsOptions(user)
        break
      }
      case ticketStates.AWAITING_REVIEW: {
        options.where = this.getAwaitingTicketsOptions(user)
        break
      }
      case ticketStates.CLOSED: {
        options.where = this.getClosedTicketsOptions(user)
        break
      }
    }

    let whereCustomerId
    if (isCustomer) {
      whereCustomerId = {
        [Op.eq]: user.id
      }
    } else {
      const customers = await CustomerDAO.getDependantCustomers(user.id)
      whereCustomerId = {
        [Op.in]: customers.map(customer => customer.id)
      }
    }

    options.where.customerId = whereCustomerId

    return Ticket.findAll(options)
  }
}

module.exports = TicketDAO

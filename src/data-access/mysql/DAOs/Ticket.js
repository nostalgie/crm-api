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

    return options
  }

  getAwaitingTicketsOptions (userId) {
    const options = {
      where: {
        customerId: {
          [Op.eq]: userId
        },
        rating: {
          [Op.eq]: null
        },
        isFinished: {
          [Op.eq]: true
        }
      },
      include: [
        {
          model: Update,
          required: false
        }
      ]
    }

    return options
  }

  getClosedTicketsOptions (userId) {
    const options = {
      where: {
        customerId: {
          [Op.eq]: userId
        },
        rating: {
          [Op.ne]: null
        },
        isFinished: {
          [Op.eq]: true
        }
      },
      include: [
        {
          model: Update,
          required: false
        }
      ]
    }

    return options
  }

  async getByState (state, user) {
    const isCustomer = user.role === userType.CUSTOMER
    let options
    switch (state) {
      case ticketStates.OPEN: {
        options = this.getOpenTicketsOptions(user)
        break
      }
      case ticketStates.AWAITING_REVIEW: {
        options = this.getAwaitingTicketsOptions(user)
        break
      }
      case ticketStates.CLOSED: {
        options = this.getClosedTicketsOptions(user)
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

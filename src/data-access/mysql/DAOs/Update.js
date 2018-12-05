const { Op } = require('sequelize')
const Update = require('../models/Update')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const EmployeeRole = require('../models/EmployeeRole')

class UpdateDAO {
  getUpdatesForTicket (ticketId, updates) {
    const sortedUpdates = {
      employee: [],
      customer: []
    }

    updates.forEach(update => sortedUpdates[update.userType].push(update.userId))

    const customerOptions = {
      where: {
        id: {
          [Op.in]: sortedUpdates.customer
        }
      },
      include: [
        {
          model: Customer,
          association: 'belongsTo',
          attributes: [ 'id', 'name' ],
          on: {
            id: {
              [Op.eq]: 'update.user_id'
            }
          }
        }
      ]
    }

    const employeeOptions = {
      where: {
        id: {
          [Op.in]: sortedUpdates.employee
        }
      },
      include: [
        {
          model: Employee,
          attributes: [ 'id', 'firstName' ],
          on: {
            id: {
              [Op.eq]: 'update.user_id'
            }
          },
          include: [
            {
              model: EmployeeRole,
              attributes: [ 'name' ]
            }
          ]
        }
      ]
    }

    return [ Update.findAll(customerOptions), Update.findAll(employeeOptions) ]
  }
}

module.exports = UpdateDAO

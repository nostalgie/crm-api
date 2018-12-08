const { Op } = require('sequelize')
const Employee = require('../models/Employee')
const EmployeeRole = require('../models/EmployeeRole')
const Customer = require('../models/Customer')
const { adminRoles } = require('../../../constants/userTypes')

class EmployeeDAO {
  async getEmployeeByCredsId (id) {
    const options = {
      include: [
        {
          model: EmployeeRole,
          attributes: ['name']
        }
      ],
      where: {
        credentialsId: {
          [Op.eq]: id
        }
      }
    }

    return Employee.findOne(options)
  }

  getEmployeesForUpdates (ids) {
    if (!ids.length) {
      return []
    }

    const options = {
      attributes: [ 'id', 'firstName', 'lastName' ],
      where: {
        id: {
          [Op.in]: ids
        }
      },
      include: [
        {
          model: EmployeeRole,
          attributes: [ 'name' ]
        }
      ]
    }
    return Employee.findAll(options)
  }

  getSeniorAdminForCustomer (customerId) {
    const options = {
      include: [
        {
          model: EmployeeRole,
          attributes: [ 'name' ],
          where: {
            name: {
              [Op.eq]: adminRoles.SENIOR_ADMIN
            }
          }
        },
        {
          model: Customer,
          attributes: [],
          through: {
            where: {
              customer_id: {
                [Op.eq]: customerId
              }
            }
          }
        }
      ]
    }

    return Employee.findOne(options)
  }
}

module.exports = new EmployeeDAO()

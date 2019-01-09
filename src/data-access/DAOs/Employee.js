const { Op } = require('sequelize')
const { adminRoles } = require('../../constants/userTypes')

class EmployeeDAO {
  constructor (db) {
    this.db = db
  }

  async getEmployeeByCredsId (id) {
    const options = {
      include: [
        {
          model: this.db.EmployeeRole,
          attributes: ['name']
        }
      ],
      where: {
        credentialsId: {
          [Op.eq]: id
        }
      }
    }

    return this.db.Employee.findOne(options)
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
          model: this.db.EmployeeRole,
          attributes: [ 'name' ]
        }
      ]
    }
    return this.db.Employee.findAll(options)
  }

  getSeniorAdminForCustomer (customerId) {
    const options = {
      include: [
        {
          model: this.db.EmployeeRole,
          attributes: [ 'name' ],
          where: {
            name: {
              [Op.eq]: adminRoles.SENIOR_ADMIN
            }
          }
        },
        {
          model: this.db.Customer,
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

    return this.db.Employee.findOne(options)
  }
}

module.exports = EmployeeDAO

const { Op } = require('sequelize')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')

class CustomerDAO {
  getCustomerByCredsId (id) {
    const options = {
      where: {
        credentialsId: {
          [Op.eq]: id
        }
      }
    }

    return Customer.find(options)
  }

  getCustomersForUpdates (ids) {
    if (!ids.length) {
      return []
    }

    const options = {
      attributes: [ 'id', 'name' ],
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
    return Customer.findAll(options)
  }

  async getDependantCustomers (empId) {
    const options = {
      attributes: [ 'id', 'name' ],
      include: [
        {
          model: Employee,
          attributes: [ 'id' ],
          through: {
            where: {
              employee_id: {
                [Op.eq]: empId
              }
            }
          }
        }
      ]
    }

    const customers = await Customer.findAll(options)
    return customers.map(customer => ({ id: customer.id, name: customer.name }))
  }
}

module.exports = new CustomerDAO()

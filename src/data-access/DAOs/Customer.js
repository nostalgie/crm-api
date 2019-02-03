const { Op } = require('sequelize')

class CustomerDAO {
  constructor (db) {
    this.db = db
  }

  getCustomerByCredsId (id) {
    const options = {
      where: {
        credentialsId: {
          [Op.eq]: id
        }
      }
    }

    return this.db.Customer.findOne(options)
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
    return this.db.Customer.findAll(options)
  }

  async getDependentCustomers (empId) {
    const options = {
      attributes: [ 'id', 'name' ],
      include: [
        {
          model: this.db.Employee,
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

    const customers = await this.db.Customer.findAll(options)
    return customers.map(customer => ({ id: customer.id, name: customer.name }))
  }
}

module.exports = CustomerDAO

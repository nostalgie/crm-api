const { Op } = require('sequelize')
const Customer = require('../models/Customer')

class CustomerDAO {
  getCustomersForUpdates (ids) {
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
}

module.exports = CustomerDAO

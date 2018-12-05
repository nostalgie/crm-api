const { Op } = require('sequelize')
const Update = require('../models/Update')

class UpdateDAO {
  getForTicket (ticketId) {
    const options = {
      where: {
        ticketId: {
          [Op.eq]: ticketId
        }
      }
    }

    return Update.findAll(options)
  }
}

module.exports = UpdateDAO

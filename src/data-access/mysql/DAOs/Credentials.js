const { Op } = require('sequelize')
const Credentials = require('../models/Credentials')

class CredentialsDAO {
  async getByUsername (value) {
    const result = await Credentials.findOne({
      where: {
        username: {
          [Op.eq]: value
        }
      }
    })

    return result
  }
}

module.exports = CredentialsDAO

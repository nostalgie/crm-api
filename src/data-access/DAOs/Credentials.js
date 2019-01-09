const { Op } = require('sequelize')

class CredentialsDAO {
  constructor (db) {
    this.db = db
  }

  async getByUsername (value) {
    const result = await this.db.Credentials.findOne({
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

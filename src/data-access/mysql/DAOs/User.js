const { Op } = require('sequelize')
const { User } = require('../models')

class UserDAO {
  constructor () {
    User.sync()
  }

  async findByUsername (username) {
    const result = await User.findOne({
      where: {
        username: {
          [Op.eq]: username
        }
      }
    })

    return result
  }
}

module.exports = UserDAO

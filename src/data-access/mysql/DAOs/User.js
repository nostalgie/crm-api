const { Op } = require('sequelize')
const { User } = require('../models')

class UserDAO {
  constructor () {
    User.sync()
  }

  async findBy (name, value) {
    const result = await User.findOne({
      where: {
        [name]: {
          [Op.eq]: value
        }
      }
    })

    return result
  }
}

module.exports = UserDAO

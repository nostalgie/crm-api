const { Op } = require('sequelize')
const User = require('../models/User')
const Role = require('../models/Role')

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
      },
      include: [
        {
          model: Role,
          attributes: [
            'name'
          ],
          required: true
        }
      ]
    })

    return result
  }
}

module.exports = UserDAO

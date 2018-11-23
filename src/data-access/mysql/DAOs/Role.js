// const { Op } = require('sequelize')
// const User = require('../models/User')
const Role = require('../models/Role')

class RoleDAO {
  constructor () {
    Role.sync()
  }
}

module.exports = RoleDAO

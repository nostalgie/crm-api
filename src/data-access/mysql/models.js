const Sequelize = require('sequelize')
const mysql = require('./connect')

const Role = mysql.define('Role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
})

const User = mysql.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.TEXT,
    field: 'password_salt'
  },
  hash: {
    type: Sequelize.TEXT,
    field: 'password_hash'
  },
  roleId: {
    type: Sequelize.INTEGER,
    field: 'role_id',
    references: {
      model: Role
    }
  }
}, {
  timestamps: false
})

module.exports = {
  Role,
  User
}

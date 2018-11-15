const Sequelize = require('sequelize')
const mysql = require('./connect')

const Role = mysql.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }
})

const User = mysql.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  passwordSalt: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'password_salt'
  },
  passwordHash: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'password_hash'
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'role_id',
    references: {
      model: Role
    }
  }
}, {
  tableName: 'Users'
})

module.exports = {
  Role,
  User
}

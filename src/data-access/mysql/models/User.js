const Sequelize = require('sequelize')
const mysql = require('../connect')

const User = mysql.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'password_salt'
  },
  hash: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'password_hash'
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'role_id'
  }
}, {
  tableName: 'Users'
})

module.exports = User

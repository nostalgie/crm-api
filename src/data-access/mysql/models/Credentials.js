const Sequelize = require('sequelize')
const mysql = require('../connect')

const Credentials = mysql.define('credentials', {
  id: {
    type: Sequelize.INTEGER,
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
  userType: {
    type: Sequelize.ENUM,
    values: ['employee', 'customer'],
    field: 'user_type',
    allowNull: false
  }
}, {
  tableName: 'Login_Credentials'
})

module.exports = Credentials

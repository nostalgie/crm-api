const Sequelize = require('sequelize')
const mysql = require('../connect')

const Update = mysql.define('update', {
  userType: {
    type: Sequelize.ENUM,
    values: ['employee', 'customer'],
    allowNull: false,
    field: 'user_type'
  },
  isFinising: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    field: 'is_finishing'
  }
}, {
  tableName: 'Updates',
  createdAt: true,
  underscored: true
})

module.exports = Update

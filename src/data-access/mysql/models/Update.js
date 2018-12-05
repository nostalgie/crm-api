const Sequelize = require('sequelize')
const mysql = require('../connect')

const Update = mysql.define('update', {
  userType: {
    type: Sequelize.ENUM,
    values: ['employee', 'customer'],
    allowNull: false,
    field: 'user_type'
  },
  isFinishing: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    field: 'is_finishing'
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  ticketId: {
    type: Sequelize.INTEGER,
    field: 'ticket_id'
  }
}, {
  tableName: 'Updates',
  createdAt: true,
  underscored: true
})

module.exports = Update

const Sequelize = require('sequelize')
const mysql = require('../connect')

const Update = mysql.define('update', {
  userType: {
    type: Sequelize.ENUM,
    values: ['employee', 'customer'],
    allowNull: false,
    field: 'user_type'
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
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
  timestamps: true,
  updatedAt: false,
  underscored: true
})

module.exports = Update

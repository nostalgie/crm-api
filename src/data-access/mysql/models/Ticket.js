const Sequelize = require('sequelize')
const mysql = require('../connect')
const Update = require('./Update')

const Ticket = mysql.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: Sequelize.ENUM,
    values: ['common', 'urgent'],
    allowNull: false
  },
  customerFirstName: {
    type: Sequelize.STRING,
    field: 'customer_first_name',
    allowNull: false
  },
  customerLastName: {
    type: Sequelize.STRING,
    field: 'customer_last_name',
    allowNull: false
  },
  customerNumber: {
    type: Sequelize.STRING,
    field: 'customer_number',
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'Tickets',
  timestamps: true,
  underscored: true
})

Update.belongsTo(Ticket, { foreignKey: 'user_id', targetKey: 'id' })

module.exports = Ticket

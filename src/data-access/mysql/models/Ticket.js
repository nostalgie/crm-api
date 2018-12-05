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
  isFinished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    field: 'is_finished'
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  customerId: {
    type: Sequelize.INTEGER,
    field: 'customer_id'
  }
}, {
  tableName: 'Tickets',
  timestamps: true,
  underscored: true
})

Update.belongsTo(Ticket, { foreignKey: 'ticket_id', targetKey: 'id' })
Ticket.hasMany(Update, { foreignKey: 'ticket_id', sourceKey: 'id' })

module.exports = Ticket

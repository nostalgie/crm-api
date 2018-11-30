const Sequelize = require('sequelize')
const mysql = require('../connect')
const Credentials = require('./Credentials')
const Ticket = require('./Ticket')

const Customer = mysql.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'Customers'
})

Customer.hasOne(Credentials, { foreignKey: 'credentials_id', targetKey: 'id' })
Ticket.belongsTo(Customer, { foreignKey: 'customer_id', sourceKey: 'id' })

Customer.sync()

module.exports = Customer

const Sequelize = require('sequelize')
const mysql = require('../connect')
const Credentials = require('./Credentials')
const EmployeeRole = require('./EmployeeRole')

const Employee = mysql.define('employee', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  middleName: {
    type: Sequelize.STRING,
    field: 'middle_name'
  }
}, {
  tableName: 'Employees'
})

Employee.hasOne(Credentials, { foreignKey: 'credentials_id', targetKey: 'id' })
Employee.hasOne(EmployeeRole, { foreignKey: 'role_id', targetKey: 'id' })

Employee.sync()

module.exports = Employee

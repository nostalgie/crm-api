const Sequelize = require('sequelize')
const mysql = require('../connect')
const Credentials = require('./Credentials')
const EmployeeRole = require('./EmployeeRole')
const Customer = require('./Customer')

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
  },
  credentialsId: {
    type: Sequelize.INTEGER,
    field: 'credentials_id'
  }
}, {
  tableName: 'Employees'
})

Employee.belongsTo(Credentials, { foreignKey: 'credentials_id', targetKey: 'id' })
Employee.belongsTo(EmployeeRole, { foreignKey: 'role_id', targetKey: 'id' })
EmployeeRole.hasMany(Employee, { foreignKey: 'role_id', sourceKey: 'id' })
Employee.belongsToMany(Customer, { through: 'Customer_Admins', foreignKey: 'employee_id' })
Customer.belongsToMany(Employee, { through: 'Customer_Admins', foreignKey: 'customer_id' })

module.exports = Employee

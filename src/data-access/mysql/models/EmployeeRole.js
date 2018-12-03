const Sequelize = require('sequelize')
const mysql = require('../connect')

const EmployeeRole = mysql.define('emp_role', {
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
  tableName: 'Employee_Roles'
})

module.exports = EmployeeRole

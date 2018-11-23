const Sequelize = require('sequelize')
const mysql = require('../connect')
const User = require('./User')

const Role = mysql.define('role', {
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
  tableName: 'Roles'
})

Role.hasMany(User, { foreignKey: 'role_id', sourceKey: 'id' })
User.belongsTo(Role, { foreignKey: 'role_id', targetKey: 'id' })

module.exports = Role

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    middleName: {
      type: DataTypes.STRING,
      field: 'middle_name'
    },
    credentialsId: {
      type: DataTypes.INTEGER,
      field: 'credentials_id'
    },
    roleId: {
      type: DataTypes.INTEGER,
      field: 'role_id'
    }
  }, {
    tableName: 'Employees'
  })

  Employee.associate = function (models) {
    Employee.belongsTo(models.Credentials, { foreignKey: 'credentials_id', targetKey: 'id', onDelete: 'CASCADE' })
    Employee.belongsTo(models.EmployeeRole, { foreignKey: 'role_id', targetKey: 'id', onDelete: 'CASCADE' })
    Employee.belongsToMany(models.Customer, { through: 'Customer_Admins', foreignKey: 'employee_id', onDelete: 'CASCADE' })
    Employee.hasMany(models.Ticket, { foreignKey: 'executorId', sourceKey: 'id', onDelete: 'CASCADE' })
  }

  return Employee
}

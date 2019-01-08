module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('employee', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

  }

  return Employee
}

// Employee.belongsTo(Credentials, { foreignKey: 'credentials_id', targetKey: 'id' })
// Employee.belongsTo(EmployeeRole, { foreignKey: 'role_id', targetKey: 'id' })
// EmployeeRole.hasMany(Employee, { foreignKey: 'role_id', sourceKey: 'id' })
// Employee.belongsToMany(Customer, { through: 'Customer_Admins', foreignKey: 'employee_id' })
// Customer.belongsToMany(Employee, { through: 'Customer_Admins', foreignKey: 'customer_id' })
// Employee.hasMany(Ticket, { foreignKey: 'executorId', sourceKey: 'id' })
// Ticket.belongsTo(Employee, { foreignKey: 'executorId', targetKey: 'id' })

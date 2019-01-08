module.exports = (sequelize, DataTypes) => {
  const EmployeeRole = sequelize.define('emp_role', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Employee_Roles'
  })

  EmployeeRole.associate = function (models) {

  }

  return EmployeeRole
}

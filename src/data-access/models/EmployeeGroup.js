module.exports = (sequelize, DataTypes) => {
  const EmployeeGroup = sequelize.define('EmployeeGroup', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'Employee_Groups'
  })

  return EmployeeGroup
}

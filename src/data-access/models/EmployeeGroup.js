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

  EmployeeGroup.associate = function (models) {
    EmployeeGroup.belongsToMany(models.Employee, { through: 'Group_Members', foreignKey: 'group_id', onDelete: 'CASCADE' })
  }

  return EmployeeGroup
}

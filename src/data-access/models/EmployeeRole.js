module.exports = (sequelize, DataTypes) => {
  const EmployeeRole = sequelize.define('EmployeeRole', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
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
    EmployeeRole.hasMany(models.Employee, { foreignKey: 'role_id', sourceKey: 'id', onDelete: 'CASCADE' })
  }

  return EmployeeRole
}

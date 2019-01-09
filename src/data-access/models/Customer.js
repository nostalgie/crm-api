module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credentialsId: {
      type: DataTypes.INTEGER,
      field: 'credentials_id'
    }
  }, {
    tableName: 'Customers'
  })

  Customer.associate = function (models) {
    Customer.belongsToMany(models.Employee, { through: 'Customer_Admins', foreignKey: 'customer_id', onDelete: 'CASCADE' })
    Customer.belongsTo(models.Credentials, { foreignKey: 'credentials_id', targetKey: 'id', onDelete: 'CASCADE' })
  }

  return Customer
}

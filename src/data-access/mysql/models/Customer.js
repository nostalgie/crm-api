module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credentialsId: {
      type: DataTypes.UUID,
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

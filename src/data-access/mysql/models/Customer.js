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
      type: DataTypes.INTEGER,
      field: 'credentials_id'
    }
  }, {
    tableName: 'Customers'
  })

  Customer.associate = function (models) {

  }

  return Customer
}

// Customer.belongsTo(Credentials, { foreignKey: 'credentials_id', targetKey: 'id' })
// Ticket.belongsTo(Customer, { foreignKey: 'customer_id', sourceKey: 'id' })

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['common', 'urgent'],
      allowNull: false
    },
    customerFirstName: {
      type: DataTypes.STRING,
      field: 'customer_first_name',
      allowNull: false
    },
    customerLastName: {
      type: DataTypes.STRING,
      field: 'customer_last_name',
      allowNull: false
    },
    customerNumber: {
      type: DataTypes.STRING,
      field: 'customer_number',
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      field: 'is_finished'
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      field: 'customer_id'
    },
    executorFrom: {
      type: DataTypes.INTEGER,
      field: 'executor_from',
      allowNull: true
    },
    executorTo: {
      type: DataTypes.INTEGER,
      field: 'executor_to'
    }
  }, {
    tableName: 'Tickets',
    timestamps: true,
    underscored: true
  })

  Ticket.associate = function (models) {
    Ticket.hasMany(models.Update, { foreignKey: 'ticket_id', sourceKey: 'id', onDelete: 'CASCADE' })
    Ticket.belongsTo(models.Customer, { foreignKey: 'customer_id', sourceKey: 'id', onDelete: 'CASCADE' })
    Ticket.belongsTo(models.Employee, { foreignKey: 'executor_from', targetKey: 'id', onDelete: 'CASCADE' })
    Ticket.belongsTo(models.Employee, { foreignKey: 'executor_to', targetKey: 'id', onDelete: 'CASCADE' })
  }

  return Ticket
}

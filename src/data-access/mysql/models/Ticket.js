module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('ticket', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    executorId: {
      type: DataTypes.INTEGER,
      field: 'executor_id'
    }
  }, {
    tableName: 'Tickets',
    timestamps: true,
    underscored: true
  })

  Ticket.associate = function (models) {

  }

  return Ticket
}

// Update.belongsTo(Ticket, { foreignKey: 'ticket_id', targetKey: 'id' })
// Ticket.hasMany(Update, { foreignKey: 'ticket_id', sourceKey: 'id' })

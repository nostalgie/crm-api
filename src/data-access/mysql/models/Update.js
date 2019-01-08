module.exports = (sequelize, DataTypes) => {
  const Update = sequelize.define('update', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userType: {
      type: DataTypes.ENUM,
      values: ['employee', 'customer'],
      allowNull: false,
      field: 'user_type'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },
    ticketId: {
      type: DataTypes.UUID,
      field: 'ticket_id'
    }
  }, {
    tableName: 'Updates',
    timestamps: true,
    updatedAt: false,
    underscored: true
  })

  Update.associate = function (models) {
    Update.belongsTo(models.Ticket, { foreignKey: 'ticket_id', targetKey: 'id', onDelete: 'CASCADE' })
  }

  return Update
}

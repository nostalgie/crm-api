module.exports = (sequelize, DataTypes) => {
  const Credentials = sequelize.define('credentials', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'password_salt'
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'password_hash'
    },
    userType: {
      type: DataTypes.ENUM,
      values: ['employee', 'customer'],
      field: 'user_type',
      allowNull: false
    }
  }, {
    tableName: 'Credentials'
  })

  return Credentials
}

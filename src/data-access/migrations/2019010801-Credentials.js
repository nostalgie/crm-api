

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Login_Credentials', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salt: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'password_salt'
      },
      hash: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'password_hash'
      },
      userType: {
        type: Sequelize.ENUM,
        values: ['employee', 'customer'],
        field: 'user_type',
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Credentials')
  }
}

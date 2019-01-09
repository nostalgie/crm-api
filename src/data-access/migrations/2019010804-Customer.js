

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      credentialsId: {
        type: Sequelize.INTEGER,
        field: 'credentials_id',
        onDelete: 'CASCADE',
        references: {
          model: 'Login_Credentials',
          key: 'id'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Customers')
  }
}

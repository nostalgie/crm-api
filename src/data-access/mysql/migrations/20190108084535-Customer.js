'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      credentialsId: {
        type: Sequelize.INTEGER,
        field: 'credentials_id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Customers')
  }
}

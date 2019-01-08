'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tickets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        values: ['common', 'urgent'],
        allowNull: false
      },
      customerFirstName: {
        type: Sequelize.STRING,
        field: 'customer_first_name',
        allowNull: false
      },
      customerLastName: {
        type: Sequelize.STRING,
        field: 'customer_last_name',
        allowNull: false
      },
      customerNumber: {
        type: Sequelize.STRING,
        field: 'customer_number',
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isFinished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'is_finished'
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      customerId: {
        type: Sequelize.INTEGER,
        field: 'customer_id'
      },
      executorId: {
        type: Sequelize.INTEGER,
        field: 'executor_id'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tickets')
  }
}

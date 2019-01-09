

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Updates', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userType: {
        type: Sequelize.ENUM,
        values: ['employee', 'customer'],
        allowNull: false,
        field: 'user_type'
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id'
      },
      ticketId: {
        type: Sequelize.INTEGER,
        field: 'ticket_id',
        onDelete: 'CASCADE',
        references: {
          model: 'Tickets',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Updates')
  }
}

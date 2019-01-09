'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customer_Admins', {
      customerId: {
        type: Sequelize.INTEGER,
        field: 'customer_id',
        onDelete: 'CASCADE',
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      employeeId: {
        type: Sequelize.INTEGER,
        field: 'employee_id',
        onDelete: 'CASCADE',
        references: {
          model: 'Employees',
          key: 'id'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Customer_Admins')
  }
}

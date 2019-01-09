'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customer_Admins', [
      {
        customer_id: 1,
        employee_id: 1
      },
      {
        customer_id: 1,
        employee_id: 2
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customer_Admins', null)
  }
}

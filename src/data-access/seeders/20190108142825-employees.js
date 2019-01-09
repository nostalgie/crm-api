'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employees', [
      {
        id: 1,
        first_name: 'Petr',
        last_name: 'Petrovich',
        middle_name: 'Duty',
        credentials_id: 1,
        role_id: 1
      },
      {
        id: 2,
        first_name: 'Kirill',
        last_name: 'Qwerty',
        middle_name: 'Senior',
        credentials_id: 2,
        role_id: 2
      },
      {
        id: 3,
        first_name: 'Nikita',
        last_name: 'Aezakmi',
        middle_name: 'Manager',
        credentials_id: 3,
        role_id: 3
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employees', null)
  }
}

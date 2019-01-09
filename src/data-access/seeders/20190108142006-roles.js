

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employee_Roles', [
      {
        id: 1,
        name: 'duty_admin'
      },
      {
        id: 2,
        name: 'senior_admin'
      },
      {
        id: 3,
        name: 'manager'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employee_Roles', null)
  }
}

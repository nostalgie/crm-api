module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Group_Members', [
      {
        group_id: 1,
        employee_id: 1
      },
      {
        group_id: 1,
        employee_id: 2
      },
      {
        group_id: 1,
        employee_id: 3
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Group_Members', null)
  }
}

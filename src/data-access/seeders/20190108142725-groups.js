module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employee_Groups', [
      {
        id: 1
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employee_Groups', null)
  }
}

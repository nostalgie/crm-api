

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_Roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Employee_Roles')
  }
}

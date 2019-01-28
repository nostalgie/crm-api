module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Group_Members', {
      groupId: {
        type: Sequelize.INTEGER,
        field: 'group_id',
        onDelete: 'CASCADE',
        references: {
          model: 'Employee_Groups',
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
    return queryInterface.dropTable('Group_Members')
  }
}

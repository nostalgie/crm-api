

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employees', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
      },
      middleName: {
        type: Sequelize.STRING,
        field: 'middle_name'
      },
      credentialsId: {
        type: Sequelize.INTEGER,
        field: 'credentials_id',
        onDelete: 'CASCADE',
        references: {
          model: 'Login_Credentials',
          key: 'id'
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id',
        onDelete: 'CASCADE',
        references: {
          model: 'Employee_Roles',
          key: 'id'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Employees')
  }
}

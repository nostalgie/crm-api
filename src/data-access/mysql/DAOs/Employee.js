const { Op } = require('sequelize')
const Employee = require('../models/Employee')
const EmployeeRole = require('../models/EmployeeRole')
// const Credentials = require('../models/Credentials')

class EmployeeDAO {
  async getRoleByCredsId (id) {
    const options = {
      attributes: [],
      include: [
        {
          model: EmployeeRole,
          attributes: ['name']
        }
      ],
      where: {
        credentialsId: {
          [Op.eq]: id
        }
      }
    }

    return (await Employee.findOne(options)).emp_role.name
  }
}

module.exports = EmployeeDAO

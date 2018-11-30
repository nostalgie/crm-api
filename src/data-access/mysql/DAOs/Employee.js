const { Op } = require('sequelize')
const Employee = require('../models/Employee')
const EmployeeRole = require('../models/EmployeeRole')

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
        credentials_id: {
          [Op.eq]: id
        }
      }
    }

    return (await Employee.findOne(options)).name
  }
}

module.exports = EmployeeDAO

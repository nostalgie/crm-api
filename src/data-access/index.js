const dms = process.env.DB_DMS

const CredentialsDAO = require(`./${dms}/DAOs/Credentials`)
const RoleDAO = require(`./${dms}/DAOs/Role`)
const EmployeeDAO = require(`./${dms}/DAOs/Employee`)
const EmployeeRoleDAO = require(`./${dms}/DAOs/EmployeeRole`)

module.exports = {
  Credentials: new CredentialsDAO(),
  Role: new RoleDAO(),
  Employee: new EmployeeDAO(),
  EmployeeRole: new EmployeeRoleDAO()
}

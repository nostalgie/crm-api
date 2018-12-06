const dms = process.env.DB_DMS

const CredentialsDAO = require(`./${dms}/DAOs/Credentials`)
const EmployeeDAO = require(`./${dms}/DAOs/Employee`)
const EmployeeRoleDAO = require(`./${dms}/DAOs/EmployeeRole`)
const TicketDAO = require(`./${dms}/DAOs/Ticket`)
const UpdateDAO = require(`./${dms}/DAOs/Update`)
const CustomerDAO = require(`./${dms}/DAOs/Customer`)

module.exports = {
  Credentials: new CredentialsDAO(),
  Employee: new EmployeeDAO(),
  EmployeeRole: new EmployeeRoleDAO(),
  Ticket: new TicketDAO(),
  Update: new UpdateDAO(),
  Customer: new CustomerDAO()
}

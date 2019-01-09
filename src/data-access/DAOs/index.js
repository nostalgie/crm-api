const db = require('../models')
const CredentialsDAO = require('./Credentials')
const EmployeeDAO = require('./Employee')
const EmployeeRoleDAO = require('./EmployeeRole')
const TicketDAO = require('./Ticket')
const UpdateDAO = require('./Update')
const CustomerDAO = require('./Customer')

module.exports = {
  Credentials: new CredentialsDAO(db),
  Employee: new EmployeeDAO(db),
  EmployeeRole: new EmployeeRoleDAO(db),
  Ticket: new TicketDAO(db),
  Update: new UpdateDAO(db),
  Customer: new CustomerDAO(db)
}

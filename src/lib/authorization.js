const jwt = require('jsonwebtoken')
const errors = require('../utils/errorCreator')
const { Credentials, Employee, Customer } = require('../data-access/DAOs')
const { sha512 } = require('../utils/createHash')
const { userType } = require('../constants/userTypes')

const login = async (username, password) => {
  const credentials = await Credentials.getByUsername(username)

  if (!credentials) {
    console.log('no creds')
    throw errors.AuthorizationError(null, 'no creds')
  }

  const { hash, salt } = credentials

  const hashToCompare = sha512(password, salt)

  if (hash !== hashToCompare) {
    console.log('wrong pass')
    throw errors.AuthorizationError(null, 'wrong pass')
  }

  const JWTPayload = {
    username: credentials.username,
    type: credentials.userType
  }

  if (credentials.userType === userType.EMPLOYEE) {
    const emp = await Employee.getEmployeeByCredsId(credentials.id)
    JWTPayload.id = emp.id
    JWTPayload.adminRole = emp.EmployeeRole.name
  } else {
    const customer = await Customer.getCustomerByCredsId(credentials.id)
    JWTPayload.id = customer.id
  }

  const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
    expiresIn: '1y'
  })

  return { token, role: JWTPayload.adminRole || JWTPayload.type }
}

module.exports = {
  login
}

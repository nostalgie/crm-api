const jwt = require('jsonwebtoken')
const { Credentials, Employee, Customer } = require('../data-access')
const { sha512 } = require('../utils/createHash')
const responseTypes = require('../constants/responseTypes')
const { userType } = require('../constants/userTypes')
const Response = require('../responses/Response')

const login = async (username, password) => {
  try {
    const credentials = await Credentials.getByUsername(username)

    if (!credentials) {
      return new Response(responseTypes.INVALID_CREDENTIALS)
    }

    const { hash, salt } = credentials

    const hashToCompare = sha512(password, salt)

    if (hash !== hashToCompare) {
      return new Response(responseTypes.INVALID_CREDENTIALS)
    }

    const JWTPayload = {
      username: credentials.username,
      type: credentials.userType
    }

    if (credentials.userType === userType.EMPLOYEE) {
      const emp = await Employee.getEmployeeByCredsId(credentials.id)
      JWTPayload.id = emp.id
      JWTPayload.adminRole = emp.emp_role.name
    } else {
      const customer = await Customer.getCustomerByCredsId(credentials.id)
      JWTPayload.id = customer.id
    }

    const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
      expiresIn: '1y'
    })

    return new Response({ ...responseTypes.SUCCESS.code, payload: { token, role: JWTPayload.role || JWTPayload.type } })
  } catch (e) {
    console.log(e.stack)
    return new Response(responseTypes.COMMON_ERROR)
  }
}

module.exports = {
  login
}

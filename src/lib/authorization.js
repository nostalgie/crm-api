const jwt = require('jsonwebtoken')
const { Credentials, Employee } = require('../data-access')
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

    const payload = {
      credentials: credentials.id,
      username: credentials.username
    }

    if (credentials.userType === userType.EMPLOYEE) {
      const empRole = await Employee.getRoleByCredsId(credentials.id)
      payload.role = empRole
    } else {
      payload.role = userType.CUSTOMER
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1y'
    })

    return new Response({ ...responseTypes.AUTHORIZATION_SUCCESS.code, payload: { token } })
  } catch (e) {
    console.log(e.stack)
  }
}

module.exports = {
  login
}

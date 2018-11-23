const HttpCodes = require('http-status-codes')

module.exports = {
  INVALID_CREDENTIALS: {
    payload: {
      code: HttpCodes.UNAUTHORIZED,
      message: 'Authorization error. Invalid credentials.'
    },
    code: HttpCodes.UNAUTHORIZED
  },
  AUTHORIZATION_SUCCESS: {
    code: 200
  }
}

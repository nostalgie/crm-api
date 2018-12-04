const HttpCodes = require('http-status-codes')

module.exports = {
  INVALID_CREDENTIALS: {
    payload: {
      code: HttpCodes.UNAUTHORIZED,
      message: 'Authorization error. Invalid credentials.'
    },
    code: HttpCodes.UNAUTHORIZED
  },
  SUCCESS: {
    code: HttpCodes.OK
  },
  CREATE_SUCCESS: {
    code: HttpCodes.CREATED
  },
  COMMON_ERROR: {
    payload: {
      code: HttpCodes.BAD_REQUEST,
      message: 'Error occured. Please try again later.'
    },
    code: HttpCodes.BAD_REQUEST
  }
}

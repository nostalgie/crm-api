const errorTypes = require('../constants/errorTypes')

const createError = ({ name, code }) => {
  this.name = name
  this.code = code

  return (error, message) => {
    if (error) {
      this.stack = error.stack
    }
    this.message = message

    return {
      _code: this.code,
      name: this.name,
      createdAt: new Date().toUTCString(),
      message: this.message
    }
  }
}

const errors = {}
Object.keys(errorTypes).forEach(errorTypeKey => {
  errors[errorTypeKey] = createError(errorTypes[errorTypeKey])
})

module.exports = errors

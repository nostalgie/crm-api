const HttpCodes = require('http-status-codes')

module.exports = (err, req, res, next) => {
  console.error('sxs', err)
  res.status(err._code || HttpCodes.INTERNAL_SERVER_ERROR).send(err.message)
}

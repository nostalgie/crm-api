const dms = process.env.DB_DMS

const UserDAO = require(`./${dms}/DAOs/User`)

module.exports = {
  User: new UserDAO()
}

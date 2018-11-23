const dms = process.env.DB_DMS

const UserDAO = require(`./${dms}/DAOs/User`)
const RoleDAO = require(`./${dms}/DAOs/Role`)

module.exports = {
  User: new UserDAO(),
  Role: new RoleDAO()
}

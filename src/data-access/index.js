const dms = process.env.DB_DMS

const CredentialsDAO = require(`./${dms}/DAOs/Credentials`)
const RoleDAO = require(`./${dms}/DAOs/Role`)

module.exports = {
  User: new CredentialsDAO(),
  Role: new RoleDAO()
}

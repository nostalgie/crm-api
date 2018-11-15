const Sequelize = require('sequelize')

const connect = () => {
  const mysql = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DMS
    }
  )

  console.log('connected')
  return mysql
}

module.exports = connect()

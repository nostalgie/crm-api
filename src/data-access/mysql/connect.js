const Sequelize = require('sequelize')

const options = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DMS,
  host: process.env.DB_HOST,
  define: {
    timestamps: false,
    charset: 'cp1251',
    dialectOptions: {
      collate: 'cp1251_general_ci'
    }
  },
  sync: {
    force: false
  }
}

const connect = () => {
  const mysql = new Sequelize(options)
  mysql.sync()

  console.log('connected')
  return mysql
}

module.exports = connect()
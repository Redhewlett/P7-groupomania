require('dotenv').config()

const mysql = require('mysql2')

// const isProduction = process.env.NODE_ENV === 'production'

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATA_BASE
})

con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

module.exports = con

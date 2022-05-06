const express = require('express')
//call express methode to creat the app
const app = express()
//helmet protect hide express related informations and prevent our website from using outside ressources
const helmet = require('helmet')

//data base connection
const con = require('./dbConfig')
const cors = require('cors')
//==================Routes================
const userRoutes = require('./routes/user')
// const socialRoutes = require('./routes/social')
//==================Routes end================

//intercept any request containing json() content and put it in the request body (same as body parser)
app.use(express.json())
app.use(cors())

//==========data base connection============
//store our values away, in the .env
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '#Roadtodev971*',
//   database: 'groupomania_social'
// })

// con.connect(function (err) {
//   if (err) throw err
//   console.log('Connected!')
// })

//==========db connection end============

//using helmet to allow our front to upload the image
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }))

//header on response object
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use('/api/auth', userRoutes)

//export the app so we can use it in our server
module.exports = app

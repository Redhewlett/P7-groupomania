const express = require('express')
//call express methode to creat the app
const app = express()
const cookieParser = require('cookie-parser')
//helmet protect hide express related informations and prevent our website from using outside ressources
const helmet = require('helmet')

require('dotenv').config()
//data base connection
const con = require('./dbConfig')
const cors = require('cors')
const bodyParser = require('body-parser')

//==================Routes================
const userRoutes = require('./routes/user')
const socialRoutes = require('./routes/social')
//==================Routes end================

//intercept any request containing json()
app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

app.use(bodyParser.urlencoded({ extended: true }))

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
app.use('/api/social', socialRoutes)

//export the app so we can use it in our server
module.exports = app

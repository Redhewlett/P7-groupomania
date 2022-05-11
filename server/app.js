const express = require('express')
//call express methode to creat the app
const app = express()
//helmet protect hide express related informations and prevent our website from using outside ressources
const helmet = require('helmet')

//data base connection
const con = require('./dbConfig')
//session and cookie setting
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const sessionSecret = process.env.SESSION_SECRET

//==================Routes================
const userRoutes = require('./routes/user')
const socialRoutes = require('./routes/social')
//==================Routes end================

//intercept any request containing json() content and put it in the request body (same as body parser)
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)
app.use(cookieParser())
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

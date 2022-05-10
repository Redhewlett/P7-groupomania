const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

//Creat user
router.post('/signup', userCtrl.signup)
//Login user
router.post('/login', userCtrl.login)
//Login GET user session info / Logout
router.get('/loginSession', userCtrl.loginSession)
router.get('/logOut', userCtrl.logOut)

module.exports = router

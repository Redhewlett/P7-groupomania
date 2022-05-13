const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

//Creat user
router.post('/signup', userCtrl.signup)
//Login user
router.post('/login', userCtrl.login)
//Login GET user  info / Logout
router.get('/profile', auth, userCtrl.profile)
router.get('/logOut', userCtrl.logOut)

module.exports = router

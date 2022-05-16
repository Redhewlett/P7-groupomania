const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

//Creat user
router.post('/signup', userCtrl.signup)
//Login user
router.post('/login', userCtrl.login)
//Login GET user  info / delete account
router.get('/profile', auth, userCtrl.profile)
router.delete('/deleteAccount', auth, userCtrl.deleteAccount)

module.exports = router

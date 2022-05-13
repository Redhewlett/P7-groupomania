const express = require('express')
const router = express.Router()
const socialCtrl = require('../controllers/social')
const auth = require('../middleware/auth')

//=============Sauces routes==================

//get the list of all posts
router.get('/posts', auth, socialCtrl.getAllPosts)
//get one post
router.get('/posts/:id', auth, socialCtrl.getOnePost)
//creat new post
router.post('/posts', auth, socialCtrl.createPost)
//delete an post
router.delete('/posts/:id', auth, socialCtrl.deletePost)

module.exports = router

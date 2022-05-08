const express = require('express')
const router = express.Router()
const socialCtrl = require('../controllers/social')

//=============Sauces routes==================

//get the list of all posts
router.get('/posts', socialCtrl.getAllPosts)
//get one post
router.get('/posts/:id', socialCtrl.getOnePost)
//creat new post
router.post('/posts', socialCtrl.createPost)
//delete an post
router.delete('/posts/:id', socialCtrl.deletePost)

module.exports = router

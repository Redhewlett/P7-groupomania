const con = require('../dbConfig')
const jwt = require('jsonwebtoken')

//=================get the list of all posts=================
exports.getAllPosts = (req, res, next) => {
  const stmt = `SELECT * FROM groupomania_social.articles;`

  con.query(stmt, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }
    const data = []
    for (const result of results) {
      const { user_id, title, tags, author, date, id } = { ...result }
      // Base64 encoded string
      const { article } = { ...result }

      const base64 = article

      // create a buffer
      const buff = Buffer.from(base64, 'base64')

      // decode buffer as UTF-8
      const decodedArticle = buff.toString('utf-8')
      const obj = { user_id, title, decodedArticle, tags, author, date, id }

      data.push(obj)
    }
    return res.send(data)
  })
}
//=================get one post=================
exports.getOnePost = (req, res, next) => {
  const stmt = `SELECT * FROM groupomania_social.articles WHERE id = ?;`
  const id = req.params.id

  con.query(stmt, id, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }
    //if no post was found send not found
    if (results.length == 0) {
      return res.status(404).json({ message: '404 - post not found with this id' })
    }
    const { user_id, title, tags, author, date, id } = { ...results[0] }
    // Base64 encoded string
    const base64 = results[0].article

    // create a buffer
    const buff = Buffer.from(base64, 'base64')

    // decode buffer as UTF-8
    const article = buff.toString('utf-8')
    const data = { user_id, title, article, tags, author, date, id }

    return res.send([data])
  })
}
//get a list of post depending on user id
exports.getMyArticles = (req, res, next) => {
  const token = req.headers.authorization.split('JWT ')[1]
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  const userId = decodedToken.userId
  const stmt = `SELECT * FROM groupomania_social.articles WHERE user_id = ?;`

  con.query(stmt, userId, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }
    res.send(results)
  })
}
//=================creat new post=================
exports.createPost = (req, res) => {
  //encoding the richtexteditor's data before sending
  // create a buffer
  const buff = Buffer.from(req.body.article, 'utf-8')
  // decode buffer as Base64
  const base64 = buff.toString('base64')
  // print Base64 string
  //console.log(base64)

  const data = `"${req.body.user_id}", "${req.body.title}", "${base64}", "${req.body.tags}","${req.body.author}", "${req.body.date}"`
  const stmt = `INSERT INTO groupomania_social.articles(user_id,title,article,tags,author,date)VALUES(${data})`
  con.query(stmt, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }
    return res.status(200).json({ message: 'new article created' })
  })
}

//==================modify a post================
exports.modifyPost = (req, res) => {
  const token = req.headers.authorization.split('JWT ')[1]
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  //find the post we want to modify
  const stmt = `SELECT * FROM groupomania_social.articles WHERE id = ?;`
  const postToModify = req.params.id
  con.query(stmt, postToModify, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }
    //if no post was found send not found
    if (results.length == 0) {
      return res.status(404).json({ message: '404 - post not found with this id' })
    }
    //verify one more time that it's the right user
    if (results[0].user_id === decodedToken.userId) {
      //if it's right we can modify the post and respond
      // create a buffer
      const buff = Buffer.from(req.body.article, 'utf-8')
      // decode buffer as Base64
      const base64 = buff.toString('base64')

      const update = `UPDATE groupomania_social.articles SET title = "${req.body.title}", article = "${base64}", tags = "${req.body.tags}", author = "${req.body.author}", date = "${req.body.date}", user_id = "${req.body.user_id}" WHERE id = "${postToModify}";`
      con.query(update, (err, results) => {
        if (err) {
          throw err
        }
        return res.status(204)
      })
    } else {
      return res.statut(401)
    }
  })
}
//=================delete a post=================
exports.deletePost = (req, res) => {
  const token = req.headers.authorization.split('JWT ')[1]
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  const postToDelete = req.params.id
  const stmt = `SELECT * FROM groupomania_social.articles WHERE id = ?;`
  console.log
  //first check if the post exist
  con.query(stmt, postToDelete, (err, result, fields) => {
    if (err) {
      return console.error(err.message)
    }
    //if no post was found send not found
    if (result.length == 0) {
      return res.status(404).json({ message: '404 - post not found with this id' })
    }
    //if we find it we compare the user_id
    const foundPost = result[0]
    //if they're identical we can delete the post
    if ((foundPost.user_id === decodedToken.userId) | (decodedToken.userRole == process.env.ADMIN_CODE)) {
      postDeletion()
    }
  })

  const postDeletion = () => {
    const deleteStatement = `DELETE FROM groupomania_social.articles WHERE id = ?;`
    con.query(deleteStatement, postToDelete, (err, results, fields) => {
      if (err) {
        return console.error(err.message)
      }
      //if no post was found send not found
      if (results.length == 0) {
        return res.status(404).json({ message: '404 - post not found with this id' })
      }
      return res.status(201)
    })
  }
}

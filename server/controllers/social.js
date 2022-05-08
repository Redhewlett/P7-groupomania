const con = require('../dbConfig')

//=================get the list of all posts=================
exports.getAllPosts = (req, res, next) => {
  const stmt = `SELECT * FROM groupomania_social.articles;`

  con.query(stmt, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }
    return res.send(results)
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

    return res.send(results)
  })
}
//=================creat new post=================
exports.createPost = (req, res, next) => {
  const data = `"${req.body.user_id}", "${req.body.title}", "${req.body.article}", "${req.body.tags}","${req.body.author}", "${req.body.date}"`
  const stmt = `INSERT INTO groupomania_social.articles(user_id,title,article,tags,author,date)VALUES(${data})`
  con.query(stmt, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }
    return res.status(200).json({ message: 'new article created' })
  })
}
//=================delete an post=================
exports.deletePost = (req, res, next) => {
  const user = req.body.user_id
  const postToDelete = req.body.id
  const currentPost = req.params.id
  const selectPost = `SELECT * FROM groupomania_social.articles WHERE id = ?;`

  //first check if the post exist
  con.query(selectPost, currentPost, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'article not found' })
    } else {
      // //check if it's the same user trying to access it
      res.status(200)
      const postCreator = results[0].user_id
      //if it's not the right user we stop here
      if (postCreator !== user) {
        return res.status(401).json({ message: 'not authorized!' })
      }
      //if it's the same user we delete the post
      const deleteStmt = `DELETE FROM groupomania_social.articles WHERE id = ?;`
      con.query(deleteStmt, postToDelete, (err, results, fields) => {
        if (err) {
          return console.error(err.message)
        }
        return res.status(200).json({ message: 'article deleted successfully' })
      })
    }
  })
}

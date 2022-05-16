require('dotenv').config()
//================Security-Start=====================
const jwt = require('jsonwebtoken')
//import bcrypt to ash the password
const bcrypt = require('bcrypt')
//database Connection
const con = require('../dbConfig')

//================Security-End=====================

//================Auth middlewares=================
exports.signup = (req, res) => {
  //generate unique userId
  const userId = req.body.nom.charAt(2) + req.body.departement.charAt(0) + Math.floor(Math.random() * 500) + req.body.prenom.charAt(0)
  //creat user sql_statement
  const stmt = `INSERT INTO groupomania_social.user(id,nom,prenom,email,password,departement)
VALUES(?,?,?,?,?,?)`
  //create user function
  const createUser = () => {
    //first hash the password, to avoid async
    bcrypt
      .hash(req.body.password, 15)
      .then((hash) => {
        //then assemble data to use it next to our statement in the sql request and use the hash
        const newUser = [userId, `${req.body.nom}`, `${req.body.prenom}`, `${req.body.email}`, `${hash}`, `${req.body.departement}`, `NULL`]
        con.query(stmt, newUser, (err, results, fields) => {
          if (err) {
            return console.error(err.message)
          }
        })
      })
      .catch((error) => res.status(400).json({ error }))
  }

  //check if user is realdy in data base with email adress
  const email = req.body.email
  con.query(`SELECT * FROM groupomania_social.user WHERE email = "${email}";`, (err, results) => {
    if (err) {
      throw err
    }
    if (results.length > 0) {
      res.send({ message: 'already in data base' })
      return
    }
    createUser()
  })
}

//login user
exports.login = (req, res) => {
  //first find the user
  const email = req.body.email
  const password = req.body.password

  con.query(`SELECT * FROM groupomania_social.user WHERE email = "${email}";`, (err, result) => {
    if (err) {
      throw err
    }
    const foundUser = result
    if (foundUser == 0) {
      return res.send({ message: 'Wrong Email' })
    }
    //if he's found lets compare passwords
    bcrypt
      .compare(password, foundUser[0].password)
      .then((valid) => {
        if (valid) {
          const userId = foundUser[0].id
          const userRole = foundUser[0].role_id
          const accessToken = jwt.sign({ userId: userId, userRole: userRole }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
          res.cookie('token', accessToken, {
            sameSite: 'strict',
            maxAge: 7200000 //2h cookie same as the token
          })

          res.status(200).json({ accessToken })
        } else {
          res.send({ message: 'Wrong username/password combination!' })
        }
      })
      .catch((error) =>
        res.status(500).json({
          error
        })
      )
  })
}

exports.profile = (req, res) => {
  //get the token from the req headers
  const cookieHeader = req.headers.authorization

  const token = req.headers.authorization.split('JWT ')[1]
  //extract the user id from it to get his profile from the data base
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  con.query(`SELECT * FROM groupomania_social.user WHERE id = "${decodedToken.userId}";`, (err, result) => {
    if (err) {
      throw err
    }
    const foundUser = result
    if (foundUser === 0) {
      console.log(foundUser)
      return res.status(404)
    }
    //if he's found lets send his info(except password even if it's hashed)
    const { id, nom, prenom, email, departement, role_id } = foundUser[0]
    return res.send({ id, nom, prenom, email, departement, role_id })
  })
}

exports.deleteAccount = (req, res) => {
  const token = req.headers.authorization.split('JWT ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(403)
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { userId } = { ...decodedToken }
    //check if the user exists
    con.query(`SELECT * FROM groupomania_social.user WHERE id = "${userId}";`, (err, result) => {
      if (err) {
        throw err
      }
      //if the user exists we can delete (we can choose to delete his articles or no)
      const stmt = `DELETE FROM groupomania_social.user WHERE id = ?;`
      con.query(stmt, userId, (err, results) => {
        if (err) {
          throw err
        }
        return res.status(204)
      })
    })
  })
}

//================End Auth========================

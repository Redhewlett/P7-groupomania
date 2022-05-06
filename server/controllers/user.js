//================Security-Start=====================

//import bcrypt to ash the password
const bcrypt = require('bcrypt')
//json token for the auth verification
const jwt = require('jsonwebtoken')
const con = require('../dbConfig')
//================Security-End=====================

//================Auth middlewares=================
exports.signup = (req, res, next) => {
  //generate unique userId
  const userId = req.body.nom.charAt(2) + req.body.departement.charAt(0) + Math.floor(Math.random() * 500) + req.body.prenom.charAt(0)
  //creat user sql_statement
  const stmt = `INSERT INTO groupomania_social.user(id,nom,prenom,email,password,departement,profile_picture,role_id)
VALUES(?,?,?,?,?,?,?,?)`
  //create user function
  const createUser = () => {
    //first hash the password, to avoid async
    bcrypt
      .hash(req.body.password, 15)
      .then((hash) => {
        //then assemble data to use it next to our statement in the sql request and use the hash
        const newUser = [userId, `${req.body.nom}`, `${req.body.prenom}`, `${req.body.email}`, `${hash}`, `${req.body.departement}`, `NULL`, 2]
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

  //   bcrypt.hash(req.body.password, 15).then((hash) => {
  //     res.send(hash)
  //   })

  //the syntax is sensitive to " " around what you look for in the data base
}

//login user
exports.login = (req, res, next) => {}
//================End Auth========================

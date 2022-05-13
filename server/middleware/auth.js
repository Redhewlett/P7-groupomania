require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const cookieHeader = req.headers.authorization
  const token = req.headers.authorization.split('JWT ')[1]
  if (token === 'undefined') {
    return res.sendStatus(401)
  }
  if (cookieHeader) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        return res.status(403)
      }
      //const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      // console.log('your token is valid')
      // console.log(decodedToken)
      next()
    })
  } else {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log('your token is valid')
    console.log(decodedToken)
    res.status(401).json({ error: 'accès non authorisé' })
  }
}

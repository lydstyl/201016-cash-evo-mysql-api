const jwt = require('jsonwebtoken')

const User = require('../models/user')

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.decodedToken = decodedToken

      try {
        const user = await User.findOne({ where: { email: decodedToken.data } })
        req.user = user

        next()
      } catch (error) {
        console.log('error', error)
      }
    })
  } else {
    res.sendStatus(401)
  }
}

module.exports = authenticateJWT

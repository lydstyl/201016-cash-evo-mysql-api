const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
  console.log('mimimidleware !!')

  const authHeader = req.headers.authorization
  console.log('🚀 ~ file: authenticateJWT.js ~ line 7 ~ authenticateJWT ~ authHeader', authHeader)

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403)
      }

      console.log('🚀 ~ file: authenticateJWT.js ~ line 20 ~ jwt.verify ~ decodedToken', decodedToken)
      req.decodedToken = decodedToken
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

module.exports = authenticateJWT

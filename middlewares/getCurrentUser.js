const User = require('../models/user')

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByPk(1)
    req.user = user

    next()
  } catch (error) {
    console.log('error', error)
  }
}

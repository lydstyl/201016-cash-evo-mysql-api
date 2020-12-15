const jwt = require('jsonwebtoken')

const User = require('../models/user')

// @desc    Login user
// @route   POST /api/v1/login
// @access  Public
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body

  if (password === process.env.TEMPORARY_PASSWORD) {
    const token = jwt.sign({
      data: email
    }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ success: true, msg: 'User loged in !', token })
  } else {
    res.status(500).json({ success: false, msg: 'Error in postLogin controller' })
  }
}

// @desc    Create user === sign up
// @route   POST /api/v1/users
// @access  Public
exports.postUsers = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const result = await User.create({ email, password })

    const user = result.dataValues

    res
      .status(200)
      .json({ success: true, msg: 'User created', data: user })
  } catch (error) {
    console.log('🚀 ~ exports.postUsers= ~ error', error)

    res.status(500).json({ success: false, error })
  }
}

// @desc    Login user
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = (req, res, next) => {
  ;(async () => {
    try {
      // const users = await User.findAll({
      //   where: { email: 'lydstyl@gmail.com' }
      // })
      const users = await User.findAll()

      res
        .status(200)
        .json({ success: true, msg: 'Here are the users', data: users })
    } catch (error) {
      console.log('exports.getCurrentUser -> error', error)

      res.status(500).json({ success: false, error })
    }
  })()
}

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

// @desc    Create user === sign up
// @route   POST /api/v1/users
// @access  Public
exports.postUsers = async (req, res, next) => {
  try {
    let { email, password } = req.body

    // hash password

    const saltRounds = 10
    const myPlaintextPassword = password
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        console.log('🚀 ~ bcrypt.hash ~ err', err)
      } else {
        password = hash

        const result = await User.create({ email, password })

        const user = result.dataValues

        res
          .status(200)
          .json({ success: true, msg: 'User created', data: user })
      }
    })
  } catch (error) {
    console.log('🚀 ~ exports.postUsers= ~ error', error)

    res.status(500).json({ success: false, error })
  }
}

// todo desable this route

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = (req, res, next) => {
  ;(async () => {
    try {
      let users = await User.findAll()

      users = users.map(u => {
        u.password = undefined

        return u
      })

      res
        .status(200)
        .json({ success: true, msg: 'Here are the users', data: users })
    } catch (error) {
      console.log('exports.getCurrentUser -> error', error)

      res.status(500).json({ success: false, error })
    }
  })()
}

// @desc    Delete user
// @route   DELETE /api/v1/users
// @access  Public
exports.deleteUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // todo unhash password

    const result = await User.destroy({
      where: { email, password }
    })

    let msg = 'User removed'

    if (result === 0) msg = 'Wrong email or password'

    res
      .status(200)
      .json({ success: true, msg })
  } catch (error) {
    console.log('🚀 ~ exports.postUsers= ~ error', error)

    res.status(500).json({ success: false, error })
  }
}

// @desc    Login user
// @route   POST /api/v1/login
// @access  Public
exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // unhash password
    const user = await User.findOne({ where: { email } })

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.log('🚀 ~ err', err)
      } else {
        if (result) {
          const token = jwt.sign({
            data: email
          }, process.env.JWT_SECRET, { expiresIn: '1h' })

          res.status(200).json({ success: true, msg: 'User loged in !', token })
        } else {
          res.status(500).json({ success: false, msg: 'Error in postLogin controller' })
        }
      }
    })
  } catch (error) {
    console.log('🚀 ~ exports.postLogin= ~ error', error)
  }
}

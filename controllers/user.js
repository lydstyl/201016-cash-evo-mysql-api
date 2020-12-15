const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

function getHash (myPlaintextPassword) {
  return new Promise((resolve, reject) => {
    const saltRounds = 10
    bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

function comparePasswords (password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        reject(err)
      } else {
        if (result) {
          resolve(true) // passwords are the same
        } else {
          resolve(false) // passwords are not the same
        }
      }
    })
  })
}

function createJwtToken (email) {
  return jwt.sign({
    data: email
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

// @desc    Create user === sign up
// @route   POST /api/v1/users
// @access  Public
exports.postUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // hash password
    const hash = await getHash(password)

    const result = await User.create({ email, password: hash })

    const user = result.dataValues

    user.password = undefined

    const token = createJwtToken(email)

    res
      .status(200)
      .json({ success: true, msg: 'User created', token })
  } catch (error) {
    console.log('🚀 ~ exports.postUsers= ~ error', error)

    res.status(500).json({ success: false, msg: error.message })
  }
}

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

      res.status(500).json({ success: false, msg: error.message })
    }
  })()
}

// @desc    Edit user
// @route   PUT /api/v1/users
// @access  Public
exports.putUser = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body

    const user = await User.findOne({ where: { email } })

    const isGoodPassword = await comparePasswords(password, user.password)

    if (isGoodPassword) {
      const hashedPassword = await getHash(newPassword)

      user.password = hashedPassword

      user.save()

      res.status(200).json({ success: true, msg: 'User edited.' })
    } else {
      res.status(500).json({ success: false, msg: 'Wrong actual password.' })
    }
  } catch (error) {
    console.log('🚀 ~ exports.putUser= ~ error', error)
    res.status(500).json({ success: false, msg: error.message })
  }
}

// @desc    Delete user
// @route   DELETE /api/v1/users
// @access  Public
exports.deleteUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    const isGoodPassword = await comparePasswords(password, user.password)

    let msg = 'User removed'
    if (isGoodPassword) {
      await User.destroy({
        where: { email }
      })
    } else {
      msg = 'Wrong email or password'
    }

    res
      .status(200)
      .json({ success: true, msg })
  } catch (error) {
    console.log('🚀 ~ exports.postUsers= ~ error', error)

    res.status(500).json({ success: false, msg: error.message })
  }
}

// @desc    Login user
// @route   POST /api/v1/login
// @access  Public
exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      res.status(400).json({ success: false, msg: 'Wrong email.' })
    } else {
      const isGoodPassword = await comparePasswords(password, user.password)

      if (isGoodPassword) {
        const token = createJwtToken(email)

        res.status(200).json({ success: true, msg: 'User loged in !', token })
      } else {
        res.status(500).json({ success: false, msg: 'Wrong password.' })
      }
    }
  } catch (error) {
    console.log('🚀 ~ exports.postLogin= ~ error !!!', error)
    res.status(500).json({ success: false, msg: error.message })
  }
}

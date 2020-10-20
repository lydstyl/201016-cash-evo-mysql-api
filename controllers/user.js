const User = require('../models/user')

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body

  if (password === process.env.TEMPORARY_PASSWORD) {
    res.status(200).json({ success: true, msg: 'User loged in !' })
  } else {
    res.status(500).json({ success: false, error })
  }
}

exports.getUsers = (req, res, next) => {
  ;(async () => {
    try {
      const users = await User.findAll({
        where: { email: 'lydstyl@gmail.com' },
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

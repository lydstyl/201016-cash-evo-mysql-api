const User = require('../models/user')

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

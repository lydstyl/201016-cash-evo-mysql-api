const User = require('../models/user')

const Account = require('../models/account')

exports.postAccounts = async (req, res, next) => {
  try {
    await req.user.createAccount({ name: req.body.name })

    res.status(200).json({ success: true, data: req.user })
  } catch (error) {
    console.log('exports.postAccounts -> error', error)

    res.status(500).json({ success: false, error })
  }
}

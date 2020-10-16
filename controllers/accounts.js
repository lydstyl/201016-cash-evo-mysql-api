const User = require('../models/user')

const Account = require('../models/account')

exports.postAccounts = async (req, res, next) => {
  try {
    await req.user.createAccount({ name: req.body.name })

    res.status(200).json({ success: true, msg: 'Account created' })
  } catch (error) {
    console.log('exports.postAccounts -> error', error)

    res.status(500).json({ success: false, error })
  }
}

exports.getAccounts = async (req, res, next) => {
  try {
    const accounts = await req.user.getAccounts()

    res.status(200).json({ success: true, data: accounts })
  } catch (error) {
    console.log('exports.getAccounts -> error', error)

    res.status(500).json({ success: false, error })
  }
}

exports.putAccounts = async (req, res, next) => {
  try {
    const accounts = await req.user.getAccounts({
      where: {
        id: req.body.id,
      },
    })

    account = accounts[0]

    await account.update({ name: req.body.name })

    res.status(200).json({ success: true, data: account })
  } catch (error) {
    console.log('exports.putAccounts -> error', error)

    res.status(500).json({ success: false, error })
  }
}

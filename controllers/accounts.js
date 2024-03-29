const Moment = require('../models/moment')

// @desc    Create user account
// @route   POST /api/v1/accounts
// @access  Private
exports.postOneUserAccount = async (req, res, next) => {
  try {
    const result = await req.user.createAccount({ name: req.body.name })

    const account = result.dataValues

    res
      .status(200)
      .json({ success: true, msg: 'Account created', data: account })
  } catch (error) {
    console.log('exports.postAccounts -> error', error)

    res.status(500).json({ success: false, error })
  }
}

// @desc    Get user accounts
// @route   GET /api/v1/accounts
// @access  Private
exports.getAllUserAccounts = async (req, res, next) => {
  try {
    const accounts = await req.user.getAccounts({ include: Moment })

    const sortedAccounts = accounts.sort((a, b) => {
      if (a.amount < b.amount) {
        return 1
      }
      return -1
    })

    res.status(200).json({ success: true, data: sortedAccounts })
  } catch (error) {
    console.log('exports.getAccounts -> error', error)

    res.status(500).json({ success: false, error })
  }
}

// @desc    Update user account
// @route   PUT /api/v1/accounts/:id
// @access  Private
exports.putOneUserAccount = async (req, res, next) => {
  try {
    const accounts = await req.user.getAccounts({
      where: {
        id: req.params.id
      }
    })

    const account = accounts[0]

    await account.update({ name: req.body.name })

    res.status(200).json({ success: true, data: account })
  } catch (error) {
    console.log('exports.putAccounts -> error', error)

    res.status(500).json({ success: false, error })
  }
}

// @desc    Delete user account
// @route   DELETE /api/v1/accounts/:id
// @access  Private
exports.deleteOneUserAccount = async (req, res, next) => {
  try {
    const accounts = await req.user.getAccounts({
      where: { id: req.params.id }
    })

    const account = accounts[0]

    await account.destroy()

    res.status(200).json({ success: true, msg: 'account destroyed' })
  } catch (error) {
    console.log('exports.deleteAccounts -> error', error)

    res.status(500).json({ success: false, error })
  }
}

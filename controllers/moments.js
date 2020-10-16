const Account = require('../models/account')

// @desc    Create user moment account
// @route   POST /api/v1/accounts/:accountId/moments
// @access  Private
exports.postOneAccountMoment = async (req, res, next) => {
  try {
    const account = await Account.findByPk(req.params.accountId)

    const result = await account.createMoment({ amount: req.body.amount })
    console.log('exports.postOneAccountMoment -> result', result)

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.log('exports.postOneAccountMoment -> error', error)

    res.status(500).json({ success: false, error })
  }
}

// @desc    Get user account moments
// @route   POST /api/v1/accounts/:accountId/moments
// @access  Private
exports.getAllAccountMoments = async (req, res, next) => {
  try {
  } catch (error) {
    console.log('exports.getAllAccountMoments -> error', error)

    res.status(500).json({ success: false, error })
  }
}

// @desc    Update user account moments
// @route   PUT /api/v1/accounts/:accountId/moments/:momentId
// @access  Private
exports.putOneAccountMoment = async (req, res, next) => {
  try {
  } catch (error) {
    console.log('exports.putOneAccountMoment -> error', error)

    res.status(500).json({ success: false, error })
  }
}

// @desc    Delete user account moments
// @route   DELETE /api/v1/accounts/:accountId/moments/:momentId
// @access  Private
exports.deleteOneAccountMoment = async (req, res, next) => {
  try {
  } catch (error) {
    console.log('exports.deleteOneAccountMoment -> error', error)

    res.status(500).json({ success: false, error })
  }
}

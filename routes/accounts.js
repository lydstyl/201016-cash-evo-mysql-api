const express = require('express')

const accountsController = require('../controllers/accounts')

const router = express.Router()

// router.get('/accounts', accountController.getAccounts)
router.post('/accounts', accountsController.postAccounts)

module.exports = router

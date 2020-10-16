const express = require('express')

const accountsController = require('../controllers/accounts')

const router = express.Router()

router.post('/accounts', accountsController.postAccounts)
router.get('/accounts', accountsController.getAccounts)
router.put('/accounts/:id', accountsController.putAccounts)
router.delete('/accounts/:id', accountsController.deleteAccounts)

module.exports = router

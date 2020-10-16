const express = require('express')

const accountsController = require('../controllers/accounts')

const router = express.Router()

router.post('/accounts', accountsController.postOneUserAccount)
router.get('/accounts', accountsController.getAllUserAccounts)
router.put('/accounts/:id', accountsController.putOneUserAccount)
router.delete('/accounts/:id', accountsController.deleteOneUserAccount)

module.exports = router

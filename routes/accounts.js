const express = require('express')

const accountsController = require('../controllers/accounts')
const momentsController = require('../controllers/moments')

const router = express.Router()

// ACCOUNT ROUTES
router.post('/accounts', accountsController.postOneUserAccount)
router.get('/accounts', accountsController.getAllUserAccounts)
router.put('/accounts/:id', accountsController.putOneUserAccount)
router.delete('/accounts/:id', accountsController.deleteOneUserAccount)

// ACCOUNT MOMENT ROUTES
router.post(
  '/accounts/:accountId/moments',
  momentsController.postOneAccountMoment
)
router.get(
  '/accounts/:accountId/moments',
  momentsController.getAllAccountMoments
)
router.put(
  '/accounts/:accountId/moments/:momentId',
  momentsController.putOneAccountMoment
)
router.delete(
  '/accounts/:accountId/moments/:momentId',
  momentsController.deleteOneAccountMoment
)

module.exports = router

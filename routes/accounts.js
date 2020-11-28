const express = require('express')

const accountsController = require('../controllers/accounts')
const momentsController = require('../controllers/moments')
const authenticateJWT = require('../middlewares/authenticateJWT')

const router = express.Router()

// ACCOUNT ROUTES
router.post('/accounts', accountsController.postOneUserAccount)
router.get('/accounts', authenticateJWT, accountsController.getAllUserAccounts)
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
router.put('/accounts/moments/:momentId', momentsController.putOneAccountMoment)
router.delete(
  '/accounts/moments/:momentId',
  momentsController.deleteOneAccountMoment
)

module.exports = router

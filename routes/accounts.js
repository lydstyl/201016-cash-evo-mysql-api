const express = require('express')

const accountsController = require('../controllers/accounts')
const momentsController = require('../controllers/moments')
const authenticateJWT = require('../middlewares/authenticateJWT')

const router = express.Router()

// ACCOUNT ROUTES
router.post('/accounts', authenticateJWT, accountsController.postOneUserAccount)
router.get('/accounts', authenticateJWT, accountsController.getAllUserAccounts)
router.put('/accounts/:id', authenticateJWT, accountsController.putOneUserAccount)
router.delete('/accounts/:id', authenticateJWT, accountsController.deleteOneUserAccount)

// ACCOUNT MOMENT ROUTES
router.post(
  '/accounts/:accountId/moments', authenticateJWT,
  momentsController.postOneAccountMoment
)
router.get(
  '/accounts/:accountId/moments', authenticateJWT,
  momentsController.getAllAccountMoments
)
router.put('/accounts/moments/:momentId', authenticateJWT, momentsController.putOneAccountMoment)
router.delete(
  '/accounts/moments/:momentId', authenticateJWT,
  momentsController.deleteOneAccountMoment
)

module.exports = router

const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.post('/users', userController.postUser)

if (process.env.NODE_ENV === 'development') {
  router.get('/users', userController.getUsers) // desable this route in production
}

router.put('/users', userController.putUser)

router.delete('/users', userController.deleteUser)

router.post('/login', userController.postLogin)

module.exports = router

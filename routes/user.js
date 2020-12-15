const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.post('/users', userController.postUser)

router.get('/users', userController.getUsers)

router.put('/users', userController.putUser)

router.delete('/users', userController.deleteUser)

router.post('/login', userController.postLogin)

module.exports = router

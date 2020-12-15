const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.post('/login', userController.postLogin)

router.post('/users', userController.postUsers)

router.get('/users', userController.getUsers)

router.delete('/users', userController.deleteUser)

module.exports = router

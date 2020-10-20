const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.post('/login', userController.postLogin)

router.get('/users', userController.getUsers)

module.exports = router

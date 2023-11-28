const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Hello from  cash evo API !',
    })
})

router.post('/users', userController.postUser)

if (process.env.NODE_ENV === 'development') {
    router.get('/users', userController.getUsers) // desable this route in production
}

router.put('/users', userController.putUser)

router.delete('/users', userController.deleteUser)

router.post('/login', userController.postLogin)

module.exports = router

const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const sequelize = require('./utils/database')
const User = require('./models/user')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Gab', email: 'lydstyl@gmail.com' })
    }
    return user
  })
  .then((result) => {
    app.listen(4000)
    console.log('server run on http://localhost:4000/')
  })
  .catch((err) => console.log(err))

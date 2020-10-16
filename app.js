const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const sequelize = require('./utils/database')
const User = require('./models/user')
const errorController = require('./controllers/error')
const userRoutes = require('./routes/user')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1', userRoutes)
app.use(errorController.get404)
;(async () => {
  try {
    await sequelize.sync()

    const user = await User.findByPk(1)

    if (!user) {
      await User.create({ name: 'Gab', email: 'lydstyl@gmail.com' })
    }

    const PORT = 4000
    app.listen(PORT)

    console.log(`server run on http://localhost:${PORT}/api/v1/users`)
  } catch (error) {
    console.log('error', error)
  }
})()

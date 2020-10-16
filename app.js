require('colors')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const sequelize = require('./utils/database')
const User = require('./models/user')
const errorController = require('./controllers/error')
const userRoutes = require('./routes/user')

const app = express()

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')

  next()
})

// app.use(express.static(environmentRoot + '/public'))

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

    const PORT = process.env.PORT || 5000

    const server = app.listen(
      PORT,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT} http://localhost:${PORT}/api/v1/users`
          .yellow.bold
      )
    )

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
      console.log(`Error: ${err.message}`.red)

      // Close server & exit process with failure (1)
      server.close(() => process.exit(1))
    })
  } catch (error) {
    console.log('error', error)
  }
})()

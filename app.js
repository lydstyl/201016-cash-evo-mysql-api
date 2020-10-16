require('colors')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const { cors } = require('./middlewares/cors')
const getCurrentUser = require('./middlewares/getCurrentUser')

const sequelize = require('./utils/database')
const User = require('./models/user')
const Account = require('./models/account')
const Moment = require('./models/moment')

const errorController = require('./controllers/error')
const userRoutes = require('./routes/user')
const accountsRoutes = require('./routes/accounts')

const app = express()

// MODELS ASSOCIATIONS
User.hasMany(Account)
Account.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })

Account.hasMany(Moment)
Moment.belongsTo(Account, { constraints: true, onDelete: 'CASCADE' })

// MIDDLEWARES
app.all('*', cors)

// app.use(bodyParser.urlencoded({ extended: false }))
// Body parser
app.use(express.json())

app.use(getCurrentUser)

app.use('/api/v1', userRoutes)
app.use('/api/v1', accountsRoutes)
app.use(errorController.get404)
;(async () => {
  try {
    // await sequelize.sync({ force: true })
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

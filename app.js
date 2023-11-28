require('colors')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

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
Account.belongsTo(User, {
    // constraints: true,
    // onDelete: 'cascade',
    // hooks: true,
})

Account.hasMany(Moment)
Moment.belongsTo(Account, {
    // constraints: true,
    // onDelete: 'cascade',
    // hooks: true,
})

// MIDDLEWARES

// Enable Cross-origin resource sharing
// app.all('*', cors)
app.use(cors())

// Body parser
app.use(express.json())

// ROUTES
app.use('/api/v1', userRoutes)

app.use('/api/v1', accountsRoutes)

app.use(errorController.get404)

// LAUNCH SERVER
;(async () => {
    try {
        // await sequelize.sync({ force: true })
        await sequelize.sync()

        const PORT = process.env.PORT || 5000

        const server = app.listen(
            PORT,
            console.log(
                `Server running in ${process.env.NODE_ENV} mode on port ${PORT} http://localhost:${PORT}/api/v1/`
                    .yellow.bold
            )
        )

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err, promise) => {
            console.log(`Error 1: ${err.message}`.red)

            // Close server & exit process with failure (1)
            server.close(() => process.exit(1))
        })

        // Try to fix EADDRINUSE bugs
        process.on('uncaughtException', (err, promise) => {
            console.log(`Error 2: ${err.message}`)

            // Close server & exit process with failure (1)
            server.close(() => process.exit(1))
        })
        process.on('SIGTERM', (err, promise) => {
            console.log(`Error 3: ${err.message}`.red)

            // Close server & exit process with failure (1)
            server.close(() => process.exit(1))
        })
    } catch (error) {
        console.log('error', error)
    }
})()

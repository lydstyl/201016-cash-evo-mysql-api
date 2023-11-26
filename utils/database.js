const Sequelize = require("sequelize")

// // with old Heroku database
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     dialect: 'mysql',
//     host: process.env.DB_HOST
//   }
// )

// // with Sqlite3
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
})

module.exports = sequelize

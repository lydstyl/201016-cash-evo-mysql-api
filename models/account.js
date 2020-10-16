const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const Account = sequelize.define('account', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
})

module.exports = Account

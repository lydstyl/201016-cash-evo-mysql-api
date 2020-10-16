const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const AccountMoment = sequelize.define('accountMoment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: Sequelize.DECIMAL(9, 2),
})

module.exports = AccountMoment

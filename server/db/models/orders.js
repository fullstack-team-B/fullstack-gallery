const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  orderPlaced: {
    type: Sequelize.DATE,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  secondName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = PaymentMethod

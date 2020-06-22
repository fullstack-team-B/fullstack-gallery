const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderPlaced: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  firstName: {
    type: Sequelize.STRING
    // allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  paymentUsed: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order

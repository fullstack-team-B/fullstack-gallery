const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderPlaced: {
    type: Sequelize.DATE,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Order

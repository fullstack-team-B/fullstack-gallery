const Sequelize = require('sequelize')
const db = require('../db')

const OrderQuantity = db.define('orderquantity', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderQuantity

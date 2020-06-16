const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const PaymentMethod = db.define('paymentMethod', {
  creditCardNumber: {
    type: Sequelize.INTEGER
  }
})

module.exports = PaymentMethod

const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const PaymentMethod = db.define('paymentmethod', {
  creditCardNumber: {
    type: Sequelize.STRING
  }
})

module.exports = PaymentMethod

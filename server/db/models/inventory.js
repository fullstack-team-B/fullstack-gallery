const Sequelize = require('sequelize')
const db = require('../db')

//HOW CAN WE CREATE MODEL BEFORE ASSOCIATION?

// Currently not using. Will be in higher tiers.

const Inventory = db.define('inventory', {
  size: {
    type: Sequelize.CHAR
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Inventory

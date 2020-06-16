const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  line1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  line2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Address

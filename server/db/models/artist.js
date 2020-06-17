const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Artist

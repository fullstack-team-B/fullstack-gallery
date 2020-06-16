const Sequelize = require('sequelize')
const db = require('../db')

const PictureList = db.define('pictureList', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://cdn.onlinewebfonts.com/svg/img_299591.png'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = PictureList

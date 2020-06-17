const router = require('express').Router()
const {OrderDetail, Order, PictureList} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    console.log(Order.prototype)
    res.json('type')
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const picture = req.body
    await Order.prototype.addPictureList(newPicture)

    res.status(201).json('Created')
  } catch (error) {
    next(error)
  }
})

// router.delete('/', async (req, res, next) => {})

module.exports = router

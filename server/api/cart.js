const router = require('express').Router()
const {Order, OrderQuantity, PictureList} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    //get all pictures and quantity currently in the cart

    const order = await Order.findOne({
      where: {
        //hard-coded for testing
        userId: 7,
        // userId: req.params.id
        completed: false
      },
      include: [{model: PictureList}]
    })

    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // const newPictureId = req.body.id

    await OrderQuantity.create({
      picturelistId: 1,
      orderId: 3,
      quantity: 1
    })

    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

// router.delete('/', async (req, res, next) => {})

module.exports = router

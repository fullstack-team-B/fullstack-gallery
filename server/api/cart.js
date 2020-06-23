const router = require('express').Router()
const {Order, OrderQuantity, PictureList} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    //get all pictures and quantity currently in the cart

    const userId = req.params.userId

    const order = await Order.findOne({
      where: {
        //hard-coded for testing
        userId: userId,
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

// Post Request to Add item into cart and create a new Order
router.post('/', async (req, res, next) => {
  /* 

Incoming JSON data
{
  "userId": 1
	"cartExist": true,  || Front-end component will always send this data
	"picturelistId": 6,   || Depending on what is being added or updated, this will be included
	"orderId": 16,  || OrderId will always contain order ID number
	"quantity": 25  || Front end will keep track of the quantity of items inside a cart/order
}

*/

  try {
    const {userId, picturelistId, orderId, cartExist} = req.body
    let {quantity} = req.body

    if (quantity === undefined) quantity = 1

    // Sequelize method FIND OR CREATE
    const newOrder = await Order.findOrCreate({
      where: {userId: userId}
    })

    await OrderQuantity.create({
      picturelistId: picturelistId,
      orderId: newOrder[0].dataValues.id,
      quantity: quantity
    })
    // if (!cartExist) {
    //   // Creates a new order with the associated user ID
    //   const newOrder = await Order.create({
    //     userId: userId
    //   })

    //   await OrderQuantity.create({
    //     picturelistId: picturelistId,
    //     orderId: newOrder.id,
    //     quantity: quantity
    //   })
    // } else {
    //   //  Add a new item to existing order
    //   await OrderQuantity.create({
    //     picturelistId: picturelistId,
    //     orderId: orderId,
    //     quantity: quantity
    //   })
    // }

    res.status(201).json('newOrder')
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const {userId, picturelistId, orderId, quantity, cartExist} = req.body

    await OrderQuantity.update(
      {
        quantity: quantity
      },
      {
        where: {orderId: orderId, picturelistId: picturelistId}
      }
    )

    res.json('Updated')
  } catch (error) {
    next(error)
  }
})

// DELETE route for removing a single item for a user
router.delete('/', (req, res, next) => {})

// POST route for submitting an order
router.post('/submit', (req, res, next) => {})

// Delete the current card(order) for the user
router.delete('/clearCart', async (req, res, next) => {
  console.log(req.body)

  await Order.destroy({
    where: {
      userId: req.body.userId,
      completed: false
    }
  })

  res.end()
})

module.exports = router

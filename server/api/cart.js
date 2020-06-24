const router = require('express').Router()
const {Order, OrderQuantity, PictureList} = require('../db/models')
const db = require('../db/db')

// router.get('/:userId', async (req, res, next) => {
//   try {
//     //get all pictures and quantity currently in the cart

//     const userId = req.params.userId

//     const order = await Order.findOne({
//       where: {
//         //hard-coded for testing
//         userId: userId,
//         // userId: req.params.id
//         completed: false
//       },
//       include: [{model: PictureList}]
//     })

//     res.json(order)
//   } catch (error) {
//     next(error)
//   }
// })

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
      }
    })

    let orderQuantities = await OrderQuantity.findAll({
      where: {orderId: order.id}
    })

    const cart = {}
    orderQuantities.forEach(ele => {
      cart[ele.dataValues.picturelistId] = ele
    })
    cart.orderId = order.id
    res.json(cart)
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

router.put('/:userId/increase', async (req, res, next) => {
  try {
    const {orderId, pictureId} = req.body

    let orderquantity = await OrderQuantity.findOne({
      where: {
        orderId: orderId,
        picturelistId: pictureId
      }
    })

    let pictureItem = await PictureList.findOne({
      where: {
        id: pictureId
      }
    })

    orderquantity.quantity++
    // Math to get increased price
    pictureItem.price = await orderquantity.save()
    await pictureItem.save()

    res.json(pictureItem)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/decrease', async (req, res, next) => {
  try {
    const {orderId, pictureId} = req.body

    let orderquantity = await OrderQuantity.findOne({
      where: {
        orderId: orderId,
        picturelistId: pictureId
      }
    })

    let pictureItem = await PictureList.findOne({
      where: {
        id: pictureId
      }
    })

    // orderquantity.quantity--
    // Math to get decrease price
    // pictureItem.price =

    await orderquantity.save()
    // await pictureItem.save()

    res.json(pictureItem)
  } catch (err) {
    next(err)
  }
})

// DELETE route for removing all quantities of a single item for a user's cart
router.delete('/removeItem', async (req, res, next) => {
  try {
    await OrderQuantity.destroy({
      where: {
        picturelistId: req.body.itemId,
        orderId: req.body.orderId
      }
    })

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// POST route for submitting an order
router.post('/submit', (req, res, next) => {})

// Delete the current card(order) for the user
router.delete('/clearCart', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        userId: req.body.userId,
        completed: false
      }
    })

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router

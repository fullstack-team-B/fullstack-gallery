const {expect} = require('chai')
const db = require('../../server/db/index')
const Order = db.model('order')

xdescribe('Order model', async () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let order
  let date = new Date().toDateString()

  beforeEach(() => {
    order = Order.build({
      orderPlaced: date,
      firstName: 'Jeff',
      lastName: 'Bozo',
      completed: false,
      paymentUsed: null,
      price: 25
    })
  })

  afterEach(() => {
    return Promise.all([Order.truncate({cascade: true})])
  })

  describe('Type Validation', () => {
    it('includes `orderPlaced`, `firstName` `lastName`, `completed`, paymentUsed, and price', async () => {
      const savedOrder = await order.save()

      expect(savedOrder.orderPlaced.toDateString()).to.equal(date)
      expect(savedOrder.firstName).to.equal('Jeff')
      expect(savedOrder.lastName).to.equal('Bozo')
      expect(savedOrder.completed).to.equal(false)
      expect(savedOrder.paymentUsed).to.equal(null)
      expect(savedOrder.price).to.equal(25)
    })
  })
})

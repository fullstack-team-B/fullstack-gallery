'use strict'
/* eslint-disable max-statements, complexity */

const db = require('../server/db')
const {
  User,
  Address,
  Artist,
  Category,
  // Inventory,
  Order,
  OrderQuantity,
  PaymentMethod,
  PictureList
} = require('../server/db/models')

const faker = require('faker')

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const dummyUsers = []
    const dummyAddresses = []
    const dummyPictures = []
    const dummyArtists = []
    const dummyCategory = []
    const dummyPaymentMethods = []
    const dummyOrders = []
    const dummyOrderQuantities = []

    for (let i = 0; i < 10; i++) {
      // Dummy User Array
      dummyUsers.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        admin: false
      })
    }

    for (let i = 1; i <= dummyUsers.length; i++) {
      // Linked dummyAddresses
      dummyAddresses.push({
        line1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        userId: i
      })
    }

    // Dummy Artist Array
    for (let i = 0; i < 5; i++) {
      dummyArtists.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      })
    }

    // Dummy Categories Array
    dummyCategory.push(
      {
        name: 'Landscapes',
        description: faker.lorem.words()
      },
      {
        name: 'Portraits',
        description: faker.lorem.words()
      },
      {
        name: 'Abstract',
        description: faker.lorem.words()
      }
    )

    // Dummy Picture List Array
    for (let i = 0; i < 10; i++) {
      dummyPictures.push({
        name: faker.commerce.productName(),
        price: Math.ceil(faker.commerce.price(1) * 1),
        description: faker.lorem.words(),
        imageUrl: faker.image.imageUrl(),
        artistId: faker.random.number({min: 1, max: dummyArtists.length}),
        categoryId: faker.random.number({min: 1, max: dummyCategory.length})
      })
    }

    // Dummy Payment Methods Array
    for (let i = 1; i < dummyUsers.length; i++) {
      dummyPaymentMethods.push({
        creditCardNumber: faker.finance.mask(4, false, true),
        userId: i
      })
    }

    // Dummy Orders Arrray
    for (let i = 0; i < 5; i++) {
      dummyOrders.push({
        orderPlaced: faker.date.past(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        completed: faker.random.boolean(),
        paymentUsed: faker.finance.mask(4, false, true),
        price: 10000
        // Price will be calculated live in the state while end-users actually shop
        // and checkout their order. This is a hardcoded value for testing.
      })
    }

    // Dummy Order Quantities Array
    for (let i = 0; i < 10; i++) {
      dummyOrderQuantities.push({
        quantity: faker.random.number({min: 1, max: 10}),
        orderId: Math.ceil((i + 0.0001) / 2),
        picturelistId: i + 1
      })
    }

    // Create each of the users within the database
    const users = await Promise.all(
      dummyUsers.map(async ele => {
        await User.create(ele)
      })
    )
    // Also create one admin user for testing purposes
    User.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@email.com',
      password: 'admin',
      admin: true
    })

    const addresses = await Promise.all(
      dummyAddresses.map(async ele => {
        await Address.create(ele)
      })
    )

    // Create each of the artists within the database
    const artist = await Promise.all(
      dummyArtists.map(async ele => {
        await Artist.create(ele)
      })
    )

    // Create each of the categories within the database
    const categories = await Promise.all(
      dummyCategory.map(async ele => {
        await Category.create(ele)
      })
    )

    // Create each of the pictures within the database
    const pictures = await Promise.all(
      dummyPictures.map(async ele => {
        await PictureList.create(ele)
      })
    )

    // Create each of the paymentMethods within the database
    const paymentMethods = await Promise.all(
      dummyPaymentMethods.map(async ele => {
        await PaymentMethod.create(ele)
      })
    )

    // Create each of the orders within the database
    const orders = await Promise.all(
      dummyOrders.map(async ele => {
        await Order.create(ele)
      })
    )

    // Create each of the orderQuantities within the database
    const orderQuantities = await Promise.all(
      dummyOrderQuantities.map(async ele => {
        await OrderQuantity.create(ele)
      })
    )

    console.log(`seeded ${users.length} users`)
    console.log(`seeded ${addresses.length} addresses`)
    console.log(`seeded ${pictures.length} picture products`)
    console.log(`seeded ${categories.length} categories`)
    console.log(`seeded ${artist.length} artists`)
    console.log(`seeded ${paymentMethods.length} payment methods`)
    console.log(`seeded ${orders.length} orders`)
    console.log(`seeded ${orderQuantities.length} order quantities`)
    console.log(`seeded successfully`)
  } catch (error) {
    console.log(error)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

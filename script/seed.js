'use strict'

const db = require('../server/db')
const {
  User,
  Address,
  Artist,
  Category,
  Inventory,
  Order,
  PaymentMethods,
  PictureList
} = require('../server/db/models')

const faker = require('faker')

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const dummyUsers = []
    const dummyPictures = []
    const dummyArtists = []
    const dummyCategory = []
    const dummyOrders = []

    for (let i = 0; i < 10; i++) {
      // Dummy User Array
      dummyUsers.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      // Dummy Picture List Array
      dummyPictures.push({
        name: faker.commerce.productName(),
        price: Math.ceil(faker.commerce.price(1) * 100),
        description: faker.lorem.words(),
        imageUrl: faker.image.imageUrl(),
        artistId: faker.random.number({min: 1, max: 5}),
        categoryId: faker.random.number({min: 1, max: 3})
      })
    }

    // Dummy Artist Array
    for (let i = 0; i < 5; i++) {
      dummyArtists.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      })

      // Dummy Orders Arrray
      dummyOrders.push({
        orderPlaced: faker.date.past(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        completed: faker.random.boolean()
      })
    }

    // Dummy Categories Arrays
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

    // Create each of the users within the database
    const users = await Promise.all(
      dummyUsers.map(async ele => {
        return await User.create(ele)
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

    // Create each of the orders within the database
    const orders = await Promise.all(
      dummyOrders.map(async ele => {
        await Order.create(ele)
      })
    )

    console.log(`seeded ${users.length} users`)
    console.log(`seeded ${pictures.length} picture products`)
    console.log(`seeded ${categories.length} categories`)
    console.log(`seeded ${artist.length} artists`)
    console.log(`seeded ${orders.length} orders`)
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

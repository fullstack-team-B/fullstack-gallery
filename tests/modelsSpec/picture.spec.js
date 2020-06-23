const {expect} = require('chai')
const db = require('../../server/db/index')
const PictureList = db.model('picturelist')

describe('PictureList model', async () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let pictureList

  let text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  beforeEach(() => {
    pictureList = PictureList.build({
      name: 'Bike',
      price: 100,
      imageUrl: 'https://cdn.onlinewebfonts.com/svg/img_299591.png',
      description: text,
      quantity: 5
    })
  })

  afterEach(() => {
    return Promise.all([PictureList.truncate({cascade: true})])
  })

  describe('Validation', () => {
    it('includes `name`, `price` `imageUrl`, `description`, and quantity', async () => {
      const savedPicture = await pictureList.save()

      expect(savedPicture.name).to.equal('Bike')
      expect(savedPicture.price).to.equal(100)
      expect(savedPicture.imageUrl).to.equal(
        'https://cdn.onlinewebfonts.com/svg/img_299591.png'
      )
      expect(savedPicture.description).to.equal(text)
      expect(savedPicture.quantity).to.equal(5)
    })

    it("requires 'name', 'price', 'imageUrl', 'description', and 'quantity cannot be 'null'", async () => {
      pictureList.name = pictureList.price = pictureList.description = pictureList.quantity = null

      try {
        await pictureList.validate()

        throw Error(
          'validation was successful but should have failed with `first name`, `last name`, or `email` as null'
        )
      } catch (error) {
        console.log(error.message)
        expect(error.message).to.contain('picturelist.name cannot be null')
        expect(error.message).to.contain('picturelist.price cannot be null')
        expect(error.message).to.contain(
          ' picturelist.description cannot be null'
        )
        expect(error.message).to.contain(' picturelist.quantity cannot be null')
      }
    })
  })
})

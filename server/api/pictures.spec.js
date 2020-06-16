const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Picture = db.model('picture')

describe('Picture routes', ()=>{
  beforeEach(()=>{
    return db.sync({force: true})
  })

  describe('/api/pictures', ()=> {
    const pictureTitle = "Water"

    beforeEach(() => {
      return Picture.create({
        title: pictureTitle
      })
    })

    it('GET /api/pictures', async () => {
      const res = await request(app)
        .get('/api/pictures')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(pictureTitle)
    })
  })
})

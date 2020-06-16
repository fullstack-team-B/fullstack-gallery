const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Photo = db.model('photo')

describe('Photo routes', ()=>{
  beforeEach(()=>{
    return db.sync({force: true})
  })

  describe('/api/photos', ()=> {
    const photoTitle = "Water"

    beforeEach(() => {
      return Photo.create({
        title: photoTitle
      })
    })

    it('GET /api/photos', async () => {
      const res = await request(app)
        .get('/api/photos')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(photoTitle)
    })
  })
})

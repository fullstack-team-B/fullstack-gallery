const {expect} = require('chai')
const db = require('../../server/db')
const app = require('../../server/index')
const agent = require('supertest')(app)
const Picture = db.model('picturelist')

// describe('Picture routes', ()=>{
//   beforeEach(()=>{
//     return db.sync({force: true})
//   })

//   describe('/api/pictures', ()=> {
//     const pictureTitle = "Water"

//     beforeEach(() => {
//       return Picture.create({
//         title: pictureTitle
//       })
//     })

//     it('GET /api/pictures', async () => {
//       const res = await agent
//         .get('/api/pictures')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].email).to.be.equal(pictureTitle)
//     })
//   })
// })

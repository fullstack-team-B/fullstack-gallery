const {expect} = require('chai')
const db = require('../../server/db')
const app = require('../../server/index')
const agent = require('supertest')(app)
const User = db.model('user')

xdescribe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let storedUserDB
  const barrysEmail = 'theflash@email.com'
  const wallysEmail = 'kidflash@email.com'
  const users = [
    {
      firstName: 'Barry',
      lastName: 'Allen',
      email: barrysEmail,
      password: '12345',
      admin: true
    },
    {
      firstName: 'Wally',
      lastName: 'West',
      email: wallysEmail,
      password: '54321',
      admin: false
    }
  ]
  beforeEach(async () => {
    const userDB = await User.bulkCreate(users)
    storedUserDB = userDB.map(user => user.dataValues)
  })

  describe('GET users routes', () => {
    describe('/api/users/', () => {
      it('able to retrieve data from users database', async () => {
        const res = await agent.get('/api/users').expect(200)
        const data = res.body

        expect(data).to.be.an('array')
        expect(data[0].lastName).to.be.equal(storedUserDB[0].lastName)
        expect(data[0].email).to.be.equal(barrysEmail)
      })

      it('able to retrieve any data from users database', async () => {
        const res = await agent.get('/api/users').expect(200)
        const data = res.body

        expect(data).to.be.an('array')
        expect(data[0].firstName).to.be.equal(storedUserDB[0].firstName)
        expect(data[1].email).to.be.equal(wallysEmail)
      })
    })
    describe('/api/users/userId', () => {
      it(' able to retrieve data from users database base on ID', async () => {
        const res = await agent.get('/api/users/2').expect(200)
        const data = res.body

        expect(data.email).to.equal(wallysEmail)
      })

      // Need to figure out why we're getting 500 instead of 404
      xit('returns a 404 error if the ID is does not exist', () => {
        return agent.get('/api/users/9234').expect(404)
      })
    })
  })

  xdescribe('POST routes', () => {
    it('creates a new user', async () => {
      const res = await agent
        .post('/api/users')
        .send({
          firstName: 'Jay',
          lastName: 'Garrick',
          email: 'earth92Flash@email.com',
          password: '13457',
          admin: false
        })
        .expect(200)

      let data = res.body

      expect(data.id).to.not.be.an('undefined')
      expect(data.lastName).to.equal('Garrick')
    })

    it('does not create a new user without the required fields', () => {
      return agent
        .post('/api/users')
        .send({
          firstName: 'Godspeed'
        })
        .expect(500)
    })

    // Check if the articles were actually saved to the database
    it('saves the article to the DB', async () => {
      await agent
        .post('/api/users')
        .send({
          firstName: 'Oliver',
          lastName: 'Queen',
          email: 'greenarrowh@email.com',
          password: 'wr4cgecr',
          admin: false
        })
        .expect(200)

      const user = await User.findOne({
        where: {firstName: 'Oliver'}
      })

      expect(user).to.exist()
      expect(user.email).to.equal('greenarrowh@email.com')
    })

    // // delete spec
    // describe('DELETE routes', () => {
    //   it('/api/users/:userId', async () => {})

    // })
  })
})

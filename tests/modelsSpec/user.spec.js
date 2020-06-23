const {expect} = require('chai')
const db = require('../../server/db/index')
const User = db.model('user')

describe('User model', async () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let user
  beforeEach(() => {
    user = User.build({
      firstName: 'Barry',
      lastName: 'Allen',
      email: 'theflash@email.com',
      password: '12345',
      admin: false
    })
  })

  afterEach(() => {
    return Promise.all([User.truncate({cascade: true})])
  })

  xdescribe('Validation', () => {
    it('includes `firstName`, `lastName` `email`, `password`, and admin', async () => {
      const savedUser = await user.save()

      expect(savedUser.firstName).to.equal('Barry')
      expect(savedUser.lastName).to.equal('Allen')
      expect(savedUser.email).to.equal('theflash@email.com')
      expect(savedUser.password).to.include(/\w/g)
      expect(savedUser.admin).to.equal(false)
    })

    it("requires 'first name', 'last name', and 'email' cannot be 'null'", async () => {
      user.firstName = user.lastName = user.email = null

      try {
        await user.validate()

        throw Error(
          'validation was successful but should have failed with `first name`, `last name`, or `email` as null'
        )
      } catch (error) {
        expect(error.message).to.contain('user.firstName cannot be null')
        expect(error.message).to.contain('user.lastName cannot be null')
        expect(error.message).to.contain('user.email cannot be null')
      }
    })

    it("requires 'first name', 'last name', and 'email' cannot be 'empty'", async () => {
      user.firstName = user.lastName = user.email = ''

      try {
        let test = await user.validate()
        console.log(test)
        throw Error(
          'validation should fail when firstName, lastName and/or email is empty'
        )
      } catch (error) {
        console.log('Error', error.message)

        expect(error).to.be.an.instanceOf(Error)
        expect(error.message).to.contain('Validation error')
      }
    })
  })

  xdescribe('Instance Methods', () => {
    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(user.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(user.correctPassword('bonez')).to.be.equal(false)
      })
    })
  })
})

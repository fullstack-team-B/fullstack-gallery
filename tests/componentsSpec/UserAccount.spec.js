import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserAccount} from '../../client/components/UserAccount'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('UserAccount component', () => {
  let userAccount, userWrapper
  const petersEmail = 'spiderman@marvel.com'

  beforeEach('Create <Article /> wrapper', () => {
    userAccount = {
      email: petersEmail,
      firstName: 'Peter',
      lastName: 'Parker',
      admin: false
    }
    userWrapper = shallow(<UserAccount user={userAccount} />)
  })

  it('renders the first name and last name in an h3', () => {
    expect(userWrapper.find('h3').text()).to.be.equal('Welcome, Barry Allen!')
  })

  it('includes the email as an h4', () => {
    expect(
      articleWrapper
        .find('h4')
        .text()
        .to.be.equal(petersEmail)
    )
  })

  it('is not hardcoded', () => {
    const tonysEmail = 'ironman@marvel.com'

    const newAccount = {
      email: tonysEmail,
      firstName: 'Tony',
      lastName: 'Stark',
      admin: true
    }
    // we make a new component with this different data, and check its contents
    const newAccountWrapper = shallow(<UserAccount user={newAccount} />)
    expect(newAccountWrapper.find('h3').text()).to.be.equal(
      'Welcome, Tony Stark!'
    )
    expect(newAccountWrapper.find('h4').text()).to.be.equal(tonysEmail)
  })
})

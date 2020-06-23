/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserAccount} from '../../client/components/UserAccount'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('UserAccount', () => {
  let userAccount

  beforeEach(() => {
    userAccount = shallow(<UserAccount email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userAccount.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})

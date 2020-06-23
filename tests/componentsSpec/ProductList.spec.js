import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Shop} from '../../client/components/shop'

const faker = require('faker')

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Shop Component', () => {
  const dummyPictures = []

  for (let i = 0; i < 4; i++) {
    dummyPictures.push({
      name: faker.commerce.productName(),
      price: Math.ceil(faker.commerce.price(1) * 1),
      description: faker.lorem.words(),
      imageUrl: faker.image.imageUrl()
    })
  }

  let shopWrapper
  beforeEach('Create <Shop />', () => {
    shopWrapper = shallow(<Shop />)

    if (shopWrapper.instance().componentDidMount) {
      shopWrapper.instance().componentDidMount()
    }
  })

  it('starts with an initial state having an empty productlist array', () => {
    const currentState = shopWrapper.state()
    console.log(currentState)
    expect(currentState.articles).to.be.deep.equal([])
  })

  it('is comprised of <Shop /> components based on what gets placed on the state', () => {
    // This will alter the component's state (i.e. `this.state`).
    shopWrapper.setState({
      pictures: dummyPictures
    })
    // There should now be a bunch of Article components in the output.
    expect(shopWrapper.find(Shop)).to.have.length(4)
  })
})

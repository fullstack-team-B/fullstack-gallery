/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {gotItem} from '../../client/store/cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../client/history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe.only('gotItem', () => {
    it('eventually dispatches the ADD ITEM action', async () => {
      const fakeItem = {
        name: 'itemName'
      }
      mockAxios.onGet('/api/pictures/').replyOnce(200, fakeItem)
      await store.dispatch(gotItem())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ITEM')
      expect(actions[0].cart).to.be.deep.equal(fakeItem)
    })
  })
})

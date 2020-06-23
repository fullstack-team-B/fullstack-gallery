import axios from 'axios'
import history from '../history'

// Action types
const ADD_ITEM = 'ADD_ITEM'
const UPDATED_QUANTITY = 'UPDATED_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const GET_CART = 'GET_CART'

// Action creators
const addItem = item => ({
  type: ADD_ITEM,
  item
})

const updatedQuantity = cart => ({
  type: UPDATED_QUANTITY,
  cart
})

const removeItem = id => ({
  type: REMOVE_ITEM,
  id
})

const clearCart = () => ({
  type: CLEAR_CART,
})

const getCart = cart => ({type: GET_CART, cart})

// Thunk creators
export const gotItem = (item, userId) => async dispatch => {
  const picturelistId = item.id

  await axios.post(`/api/cart`, {
    picturelistId,
    userId
  })
  dispatch(addItem(item))
}

export const gotCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(getCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const increaseQuantity = (
  userId,
  orderId,
  pictureId
) => async dispatch => {
  const {data} = await axios.put(`/api/cart/${userId}/increase`, {
    orderId: orderId,
    pictureId: pictureId
  })
  dispatch(updatedQuantity(data))
}

export const decreaseQuantity = (
  userId,
  orderId,
  pictureId
) => async dispatch => {
  const {data} = await axios.put(`/api/cart/${userId}/decrease`, {
    orderId: orderId,
    pictureId: pictureId
  })
  dispatch(updatedQuantity(data))
}

export const removedItem = (itemId, orderId) => async dispatch => {
  await axios.delete('/api/cart/removeItem', {data: {itemId, orderId}})
  dispatch(removeItem(itemId))
}

export const clearedCart = userId => async dispatch => {
  await axios.delete('/api/cart/clearCart', {data: userId})
  dispatch(clearCart())
}

const initialState = {}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      state[action.item.id]
        ? (state[action.item.id].quantity = state[action.item.id].quantity + 1)
        : (action.item.quantity = 1)
      return {...state, [action.item.id]: action.item}
    case UPDATED_QUANTITY:
    // console.log(state)
    // Needs to update the cart
    // return {...state, cart: action.cart}
    case REMOVE_ITEM:
      delete state[action.id]
      return {...state}
    case CLEAR_CART:
      return initialState
    case GET_CART:
      return {...action.cart}
    default:
      return state
  }
}

export default cartReducer

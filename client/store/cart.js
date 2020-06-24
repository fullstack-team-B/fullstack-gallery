import axios from 'axios'
import history from '../history'

// Action types
const ADD_ITEM = 'ADD_ITEM'
const UPDATED_QUANTITY = 'UPDATED_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const GET_CART = 'GET_CART'
const CHECKOUT = 'CHECKOUT'

// Action creators
const addItem = item => ({type: ADD_ITEM, item})
const updatedQuantity = picture => ({type: UPDATED_QUANTITY, picture})
const removeItem = id => ({type: REMOVE_ITEM, id})
const clearCart = () => ({type: CLEAR_CART})
const getCart = cart => ({type: GET_CART, cart})
const checkout = () => ({type: CHECKOUT})

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
  const res = await axios.get(`/api/cart/${userId}`)
  dispatch(getCart(res.data))
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
  const res = await axios.get(`/api/cart/${userId}`)
  dispatch(getCart(res.data))
}

export const removedItem = (itemId, orderId, userId) => async dispatch => {
  await axios.delete('/api/cart/removeItem', {data: {itemId, orderId}})
  dispatch(removeItem(itemId))
  const res = await axios.get(`/api/cart/${userId}`)
  dispatch(getCart(res.data))
}

export const clearedCart = userId => async dispatch => {
  await axios.delete('/api/cart/clearCart', {data: {userId: userId}})
  dispatch(clearCart())
}

export const checkedOut = userId => async dispatch => {
  history.push('/checkout')
  await axios.put(`/api/cart/${userId}/checkout`)

  dispatch(checkout())
}

const initialState = {}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      state[action.item.id]
        ? (state[action.item.id].quantity = state[action.item.id].quantity + 1)
        : (action.item.quantity = 1)
      console.log(history)
      return {...state, [action.item.id]: action.item}
    case UPDATED_QUANTITY:
      const actionpic = action.picture
      const picturelist = state.picturelists
      const updatedPictureList = picturelist.map((pic, idx) => {
        if (actionpic.picturelistId === pic.id) {
          picturelist[idx].quantity = actionpic.quantity
        }
        return pic
      })

      return {...state, picturelists: updatedPictureList}
    case REMOVE_ITEM:
      delete state[action.id]
      return {...state}
    case CLEAR_CART:
      return initialState
    case GET_CART:
      return {...action.cart}
    case CHECKOUT:
      return initialState
    default:
      return state
  }
}

export default cartReducer

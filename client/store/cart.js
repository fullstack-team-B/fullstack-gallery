import axios from 'axios'
import history from '../history'

// Action types
const ADD_ITEM = 'ADD_ITEM'
const MODIFY_QUANTITY = 'MODIFY_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const GET_CART = 'GET_CART'
// const UPDATED_QUANTITY = 'UPDATED_QUANTITY'

// Action creators
const addItem = item => ({
  type: ADD_ITEM,
  item
})

// const updatedQuantity = (cart) => ({
//   type: UPDATED_QUANTITY,
//   cart,
// })

const modifyQuantity = (id, quantity) => ({
  type: MODIFY_QUANTITY,
  id,
  quantity
})

const removeItem = id => ({
  type: REMOVE_ITEM,
  id
})

const clearCart = () => ({
  type: CLEAR_CART
})

const getCart = cart => ({type: GET_CART, cart})

// Thunk creators
export const gotItem = item => /*async*/ dispatch => {
  // const {data} = await axios.get(`/api/pictures/${id}`);
  // Insert axios request w/ relevant route info for adding to orderQuantites table
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

export const modifiedQuantity = (id, quantity) => /*async*/ dispatch => {
  // Insert axios request here to update the orderQuantities table with new quantity for the specific item

  dispatch(modifyQuantity(id, quantity))
}
// export const increaseQuantity = (id) => async (dispatch) => {
//   const {data} = await axios.put(`/api/cart/${id}/increase`)
//   dispatch(updatedQuantity(data))
// }

// export const decreaseQuantity = (id) => async (dispatch) => {
//   const {data} = await axios.put(`/api/cart/${id}/decrease`)
//   dispatch(updatedQuantity(data))
// }

export const removedItem = id => /*async*/ dispatch => {
  // Axios request here to delete the specific item-row from orderQuantities table
  dispatch(removeItem(id))
}

export const clearedCart = () => /*async*/ dispatch => {
  // Axios request here to clear all rows in orderQuantities table associated with the user's orderID
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
    case MODIFY_QUANTITY:
      // API route will return a new state
      state[action.id].quantity = action.quantity
      return {...state}
    case REMOVE_ITEM:
      delete state[action.id]
      return {...state}
    case CLEAR_CART:
      return initialState
    case GET_CART:
      return {...action.cart}
    // case UPDATED_QUANTITY:
    //   return {...state, singleCandy: action.candy}
    default:
      return state
  }
}

export default cartReducer

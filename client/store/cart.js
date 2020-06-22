import axios from 'axios'
import history from '../history'

// Action types
const ADD_ITEM = 'ADD_ITEM'
const MODIFY_QUANTITY = 'MODIFY_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

// Action creators
const addItem = item => ({
  type: ADD_ITEM,
  item
})

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

// Thunk creators
export const gotItem = item => /*async*/ dispatch => {
  // const {data} = await axios.get(`/api/pictures/${id}`);
  // Insert axios request w/ relevant route info for adding to orderQuantites table
  dispatch(addItem(item))
}

export const modifiedQuantity = (id, quantity) => /*async*/ dispatch => {
  // Insert axios request here to update the orderQuantities table with new quantity for the specific item
  dispatch(modifyQuantity(id, quantity))
}

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
      state[action.id].quantity = action.quantity
      return {...state}
    case REMOVE_ITEM:
      delete state[action.id]
      return {...state}
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}

export default cartReducer

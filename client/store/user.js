import axios from 'axios'
import history from '../history'
// import {noExtendLeft} from 'sequelize/types/lib/operators'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getCart = cart => ({type: GET_CART, cart})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    // Action creator to load up existing cart for user on landing when already logged in
    const userId = res.data.id
    const existingCart = await axios.get(`/api/cart/${userId}`)
    dispatch(getCart(existingCart.data))
  } catch (err) {
    console.error(err)
  }
}

export const signup = (
  firstName,
  lastName,
  email,
  password,
  method
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      firstName,
      lastName,
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    // Action creator to load up existing cart when logging in for the 1st time
    const userId = res.data.id
    const existingCart = await axios.get(`/api/cart/${userId}`)
    dispatch(getCart(existingCart.data))
    history.push('/shop')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GET_CART:
      return {...state, existCart: action.cart}
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

//action type
const ADD_ITEM = 'ADD_ITEM'

//action creator
const addItem = item => ({
  type: ADD_ITEM,
  item
})

export const gotItem = id => async dispatch => {
  const {data} = await axios.get(`/api/pictures/${id}`)

  dispatch(addItem(data))
}

const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    default:
      return state
  }
}

export default cartReducer

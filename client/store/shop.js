import axios from 'axios'
import history from '../history'

// Action Types
const SET_PICTURES = 'SET_PICTURES'

// Action Creators
const setPictures = pictures => ({type: SET_PICTURES, pictures})

// Thunk Creators
export const getPictures = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/pictures')
    dispatch(setPictures(data))
  }
}

// Initial State
const initialState = []

export default function picturesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PICTURES:
      return [...action.pictures]

    default:
      return state
  }
}

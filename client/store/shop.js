import axios from 'axios'
import history from '../history'

// Action Types
const SET_PICTURES = 'SET_PICTURES'
const SINGLE_PICTURE = 'SINGLE_PICTURE'

// Action Creators
const setPictures = pictures => ({type: SET_PICTURES, pictures})
const singlePicture = picture => ({type: SINGLE_PICTURE, picture})

// Thunk Creators

// Fetch all pictures for entire shop viewing
export const getPictures = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/pictures')
    dispatch(setPictures(data))
  }
}

// Fetch a single picture for single product viewing
export const fetchPicture = pictureId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/pictures/${pictureId}`)
    dispatch(singlePicture(data))
  }
}

// Initial State
const initialState = []

export default function picturesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PICTURES:
      return [...action.pictures]

    case SINGLE_PICTURE:
      return [action.picture]

    default:
      return state
  }
}

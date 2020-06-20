import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_INFO = 'ALL_INFO'
const REMOVE_USER = 'REMOVE_USER'
const REMOVE_PICTURE = 'REMOVE_PICTURE'

/**
 * INITIAL STATE
 */
const adminAccess = {
  users: [],
  pictures: []
}

/**
 * ACTION CREATORS
 */
const getAllInfo = (users, pictures) => ({
  type: ALL_INFO,
  users,
  pictures
})

const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})

const removePicture = pictureId => ({
  type: REMOVE_Picture,
  pictureId
})

export const fetchAllInfo = () => async dispatch => {
  try {
    const users = await axios.get('/api/users')
    const pictures = await axios.get('/api/pictures')

    dispatch(getAllInfo(users.data, pictures.data))
  } catch (error) {
    console.log('Something went wrong')
  }
}

export const removedUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(removeUser(userId))
  } catch (error) {
    console.log('Something went wrong')
  }
}
export const removedPicture = pictureId => async dispatch => {
  try {
    await axios.delete(`/api/Pictures/${pictureId}`)
    dispatch(removePicture(pictureId))
  } catch (error) {
    console.log('Something went wrong')
  }
}

export default function(state = adminAccess, action) {
  switch (action.type) {
    case ALL_INFO:
      return {...state, users: action.users, pictures: action.pictures}
    case REMOVE_USER:
      const updatedUser = state.user.filter(user => user.id !== action.userId)
      return {...state, users: updatedUser}
    case REMOVE_PICTURE:
      const updatedPicture = state.picture.filter(
        picture => picture.id !== action.pictureId
      )
      return {...state, users: updatedPicture}
    default:
      return state
  }
}

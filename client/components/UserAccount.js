import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllInfo, removedUser, removedPicture} from '../store/adminAccess'

/**
 * COMPONENT
 */

export class UserAccount extends React.Component {
  constructor(props) {
    super(props)
  }

  removedPicture(pictureId) {
    this.props.removedPicture(pictureId)
  }

  removedUser(userId) {
    this.props.removedUser(userId)
  }

  componentDidMount() {
    this.props.fetchAllInfo()
  }
  render() {
    const {email, firstName, lastName, admin} = this.props.user
    const {pictures, users} = this.props.adminAccess
    console.log('Props: ', this.props)
    return admin ? (
      <div>
        <h3>
          Welcome, {firstName} {lastName}!
        </h3>
        <h4>{email}</h4>
        <div className="all-users">
          <h4>All Users</h4>
          <div>
            <ul className="user-container">
              {users.map(user => {
                return (
                  <li key={user.id}>
                    <div className="user-detail">
                      <h3 id="userFirstName">{user.firstName}</h3>
                      <h3 id="userLastName">{user.lastName}</h3>
                      <h3 id="userEmail">{user.email}</h3>
                      <p id="userAdmin">{user.admin}</p>
                    </div>
                    <div>
                      <button>Edit</button>
                      <button onClick={() => this.removedUser(user.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="all-pictures">
          <h4>All Products</h4>
          <div>
            <ul className="picture-container">
              {pictures.map(picture => {
                return (
                  <li key={picture.id}>
                    <img id="pictureImg" src={picture.imageUrl} />
                    <div className="detail">
                      <h3 id="pictureName">{picture.name}</h3>
                      <h3 id="picturePrice">{picture.price}</h3>
                      <p id="pictureDescription">{picture.description}</p>
                    </div>
                    <div>
                      <button>Edit</button>
                      <button onClick={() => this.removedPicture(picture.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <h3>This is an admin</h3>
      </div>
    ) : (
      <div>
        <h3>
          Welcome, {firstName} {lastName}!
        </h3>
        <ul>
          <li>Customer</li>
          <li>{email}</li>
          <li>Address</li>
        </ul>
        <img id="pictureImg" src="" />
        <button>Edit profile</button>
        {/* <Order /> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('THIS is the store: ', state)
  return {
    user: state.user,
    adminAccess: state.adminAccess
  }
}
const mapDispatch = dispatch => ({
  fetchAllInfo: () => dispatch(fetchAllInfo()),
  removedUser: userId => dispatch(removedUser(userId)),
  removedPicture: pictureId => dispatch(removedPicture(pictureId))
})

export default connect(mapState, mapDispatch)(UserAccount)

/**
 * PROP TYPES
 */
UserAccount.propTypes = {
  email: PropTypes.string
}

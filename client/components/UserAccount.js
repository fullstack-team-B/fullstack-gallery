import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllInfo, removedUser, removedPicture} from '../store/adminAccess'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
})

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
    const {classes} = this.props
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
      <div className={classes.root} align="center" style={{padding: 24}}>
        <Typography variant="h5">
          Welcome, {firstName} {lastName}!
        </Typography>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  id="pictureImg"
                  className={classes.img}
                  alt="complex"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                />
              </ButtonBase>
            </Grid>

            <Grid item xs={12} sm container align="left">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Customer
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Address
                  </Typography>
                  <Button variant="contained" size="small" color="primary">
                    Edit profile
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>}
        </Paper>

        {/* <Order /> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
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

export default withStyles(styles)(connect(mapState, mapDispatch)(UserAccount))

/**
 * PROP TYPES
 */
UserAccount.propTypes = {
  email: PropTypes.string
}

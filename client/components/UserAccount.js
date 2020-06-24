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
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

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
        <div className={classes.root} align="center" style={{padding: 24}}>
          <Typography variant="h5">
            Welcome, {firstName} {lastName}!
          </Typography>

          <Typography variant="h5">{email}</Typography>
        </div>

        <div className="all-users">
          <Typography variant="h4" style={{margin: 24}}>
            All Users
          </Typography>

          <Grid
            container
            spacing={3}
            style={{padding: 24}}
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            {users.map(user => {
              return (
                <Grid item xs={4} key={user.id}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                        variant="h5"
                      >
                        {user.firstName} {user.lastName}
                      </Typography>

                      <Typography className={classes.pos} color="textSecondary">
                        {user.email}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {user.admin}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button>Edit</Button>
                      <Button onClick={() => this.removedUser(user.id)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </div>

        <div className="all-pictures">
          <Typography variant="h4" style={{margin: 24}}>
            All Products
          </Typography>
          <Grid
            container
            spacing={3}
            style={{padding: 24}}
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            {/* <ul className="picture-container"> */}
            {pictures.map(picture => {
              return (
                <Grid item xs={4} key={picture.id}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        image={picture.imageUrl}
                        title={picture.name}
                      />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {picture.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {picture.description}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                        >
                          $ {picture.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions>
                      <Button>Edit</Button>
                      <Button onClick={() => this.removedPicture(picture.id)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}

            {/* </ul> */}

            <Typography variant="h6">This is an admin</Typography>
          </Grid>
        </div>
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

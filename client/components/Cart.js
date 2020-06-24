import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotItem,
  gotCart,
  increaseQuantity,
  decreaseQuantity,
  removedItem,
  clearedCart
} from '../store/cart'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const styles = theme => ({
  root: {
    flexGrow: 12
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    // margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
})

export class Cart extends React.Component {
  componentDidMount() {
    // Check if user is logged in before retrieving existing cart
    if (this.props.isLoggedIn) this.props.getCart(this.props.userId)
  }

  // decrease() {
  //   this.props.decreaseQuantity(this.props.match.params.id)
  // }

  render() {
    const {id, picturelists, userId} = this.props.cart
    const {classes} = this.props

    return id ? (
      <div className={classes.root}>
        <Typography variant="h4" style={{margin: 24}}>
          Cart
        </Typography>

        <Paper className={classes.paper}>
          <Typography variant="h6">Order Id #: {id}</Typography>

          {picturelists.map(ele => {
            return (
              <Grid
                item
                xs={12}
                sm
                container
                style={{padding: 24}}
                key={ele.id}
              >
                <Grid item xs container direction="row" spacing={2}>
                  <ButtonBase className={classes.image}>
                    <img
                      id="pictureImg"
                      className={classes.img}
                      src={ele.imageUrl}
                    />
                  </ButtonBase>

                  <Grid item xs>
                    <Typography variant="h5">{ele.name}</Typography>
                  </Grid>

                  <Grid item xs>
                    <Typography variant="h5">
                      Quantity: {ele.orderquantity.quantity}
                    </Typography>

                    <Button
                      onClick={() =>
                        this.props.decreaseQuantity(userId, id, ele.id)
                      }
                    >
                      &#9664;
                    </Button>
                    <Button
                      onClick={() =>
                        this.props.increaseQuantity(userId, id, ele.id)
                      }
                    >
                      &#9654;
                    </Button>
                  </Grid>

                  <Grid item xs>
                    <Button>Remove</Button>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h5">Price: ${ele.price}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
          <Box bgcolor="WhiteSmoke">
            <Typography variant="h5" align="right" style={{padding: 24}}>
              TOTAL PRICE: $800
            </Typography>
          </Box>

          <Grid item xs>
            <Button variant="contained" fullWidth color="primary">
              CHECKOUT
            </Button>
          </Grid>
        </Paper>
      </div>
    ) : (
      <h1>Loading Cart...</h1>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(gotCart(userId)),
    increaseQuantity: (userId, orderId, pictureId) =>
      dispatch(increaseQuantity(userId, orderId, pictureId)),
    decreaseQuantity: (userId, orderId, pictureId) =>
      dispatch(decreaseQuantity(userId, orderId, pictureId))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Cart))

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'
import {
  gotItem,
  gotCart,
  increaseQuantity,
  decreaseQuantity,
  removedItem,
  clearedCart,
  checkedOut
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

  render() {
    const {id, picturelists, userId} = this.props.cart

    const {classes} = this.props

    return id ? (
      <div className={classes.root}>
        <Typography variant="h4" style={{margin: 24}}>
          Cart
        </Typography>
        <Button onClick={() => this.props.clearedCart(userId)}>
            Clear Cart
          </Button>
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
                  // Product detail
                  <h2>Product Name: {ele.name}</h2>
                <h2>Quantity: {ele.orderquantity.quantity}</h2>
                <h3>Price: {ele.price * ele.orderquantity.quantity}</h3>
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
                    <Button onClick={() => this.props.removedItem(ele.id, id, userId)}>Remove</Button>
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
            // Fix Checkout
            {this.props.cart.picturelists.length ? (
          <button onClick={() => this.props.checkedOut(userId)}>
            Checkout
          </button>
        ) : (
          <div />
        )}

      </div>
    ) : (
      <h1>Cart is empty</h1>
    )
  }
            <Button variant="contained" fullWidth color="primary">
              CHECKOUT
            </Button>
          </Grid>
        </Paper>

                
                <button
                  
                >
                  Remove
                </button>
              </div>
            )
          })}
        </div>
        
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
      dispatch(decreaseQuantity(userId, orderId, pictureId)),

    clearedCart: userId => dispatch(clearedCart(userId)),

    removedItem: (itemId, orderId, userId) =>
      dispatch(removedItem(itemId, orderId, userId)),

    checkedOut: userId => dispatch(checkedOut(userId))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Cart))

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
  clearedCart
} from '../store/cart'

export class Cart extends React.Component {
  componentDidMount() {
    // Check if user is logged in before retrieving existing cart
    if (!this.props.userId) this.props.cart = {}
  }

  routeChange = () => {
    let path = `/checkout`
    history.push(path)
  }
  render() {
    console.log(this.props)
    const {userId} = this.props.userId
    const id = this.props.cart.orderId
    const cart = []
    Object.entries(this.props.cart).forEach(ele => {
      if (ele[0] !== 'orderId') cart.push(ele)
    })

    return id ? (
      <div className="cart-container">
        <div>
          <h1 className="heading">Cart</h1>
          <button onClick={() => this.props.clearedCart(userId)}>
            Clear Cart
          </button>
        </div>

        <div className="item-container">
          <h1>Order Id #: {id}</h1>
          {cart.map(ele => {
            return (
              <div key={ele.picturelistId}>
                <h2>Product Name: placeholder</h2>
                <h2>Quantity: {ele.quantity}</h2>
                <h3>Price: placeholder</h3>

                <button
                  onClick={() =>
                    this.props.increaseQuantity(userId, id, ele.picturelistId)
                  }
                >
                  Increase
                </button>

                <button
                  onClick={() =>
                    this.props.decreaseQuantity(userId, id, ele.picturelistId)
                  }
                >
                  Decrease
                </button>
                <button
                  onClick={() =>
                    this.props.removedItem(ele.picturelistId, id, userId)
                  }
                >
                  Remove
                </button>
              </div>
            )
          })}
        </div>
        {cart.length ? (
          <button onClick={this.routeChange}>Checkout</button>
        ) : (
          <div />
        )}
      </div>
    ) : (
      <h1>Cart is empty</h1>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    userId: state.user.id
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

export default connect(mapState, mapDispatch)(Cart)

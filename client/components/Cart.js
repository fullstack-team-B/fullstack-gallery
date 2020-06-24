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

export class Cart extends React.Component {
  componentDidMount() {
    // Check if user is logged in before retrieving existing cart
    if (this.props.isLoggedIn) this.props.getCart(this.props.userId)
  }

  render() {
    const {id, picturelists, userId} = this.props.cart
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
          {picturelists.map(ele => {
            return (
              <div key={ele.id}>
                <h2>Product Name: {ele.name}</h2>
                <h2>Quantity: {ele.orderquantity.quantity}</h2>
                <h3>Price: {ele.price * ele.orderquantity.quantity}</h3>

                <button
                  onClick={() =>
                    this.props.increaseQuantity(userId, id, ele.id)
                  }
                >
                  Increase
                </button>

                <button
                  onClick={() =>
                    this.props.decreaseQuantity(userId, id, ele.id)
                  }
                >
                  Decrease
                </button>
                <button
                  onClick={() => this.props.removedItem(ele.id, id, userId)}
                >
                  Remove
                </button>
              </div>
            )
          })}
        </div>
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

export default connect(mapState, mapDispatch)(Cart)

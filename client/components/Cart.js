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
    console.log('Cart:', this.props)
    return id ? (
      <div className="cart-container">
        <h1 className="heading">Cart</h1>

        <div className="item-container">
          <h1>Order Id #: {id}</h1>
          {picturelists.map(ele => {
            return (
              <div key={ele.id}>
                <h2>Product Name: {ele.name}</h2>
                <h2>Quantity: {ele.orderquantity.quantity}</h2>
                <h3>Price: {ele.price}</h3>

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
                <button>Remove</button>
              </div>
            )
          })}
        </div>
      </div>
    ) : (
      <h1>Loading Cart...</h1>
    )
  }
}

const mapState = state => {
  console.log('This the state: ', state)
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

export default connect(mapState, mapDispatch)(Cart)

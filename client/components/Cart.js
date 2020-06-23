import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotItem,
  gotCart,
  modifiedQuantity,
  removedItem,
  clearedCart
} from '../store/cart'

export class Cart extends React.Component {
  componentDidMount() {
    // Check if user is logged in before retrieving existing cart
    if (this.props.isLoggedIn) this.props.getCart(this.props.userId)
  }
  //To increase quantity
  //  increase() {
  //    this.props.increaseQuantity(this.props.match.params.id)
  //  }

  //To decrease quantity

  //  decrease() {
  //    this.props.decreaseQuantity(this.props.match.params.id)
  //  }

  render() {
    const currCart = this.props.cart

    console.log('Cart:', this.props)
    return currCart.id ? (
      <div className="cart-container">
        <h1 className="heading">Cart</h1>

        <div className="item-container">
          <h1>Order Id #: {currCart.id}</h1>
          {currCart.picturelists.map(ele => {
            return (
              <div key={ele.id}>
                <h2>Product Name: {ele.name}</h2>
                <h2>Quantity: {ele.orderquantity.quantity}</h2>
                <h3>Price: {ele.price}</h3>
                <button /*onClick={this.decrease}*/>Increase</button>
                <button /*onClick={this.decrease}*/>Decrease</button>
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
  return {
    cart: state.cart,
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(gotCart(userId))
    // increaseQuantity: (id) => dispatch(increaseQuantity(id)),
    // decreaseQuantity: (id) => dispatch(decreaseQuantity(id)),
  }
}

export default connect(mapState, mapDispatch)(Cart)

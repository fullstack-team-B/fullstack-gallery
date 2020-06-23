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
    console.log(this.props)
    // Check if user is logged in before retrieving existing cart
    if (this.props.isLoggedIn) this.props.getCart(this.props.userId)
  }

  render() {
    const currCart = this.props.cart

    return currCart ? (
      <div className="cart-container">
        <h1 className="heading">Cart</h1>

        <div className="item-container">
          <h1>{currCart.id}</h1>
        </div>
      </div>
    ) : (
      <h1>loading cart...</h1>
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
    getCart: userId => dispatch(gotCart(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotItem,
  gotCart,
  modifiedQuantity,
  removedItem,
  clearedCart
} from '../store'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.gotCart()
  }

  render() {
    // const cartId = this.props.cart.id
    console.log('props=>', this.props)
    return (
      <div className="cart-container">
        <h1 className="heading">Cart</h1>

        <div className="item-container">
          {/* {cartId ? <h1>{cartId}</h1> : <h1>loading...</h1>} */}
        </div>
      </div>
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
    gotCart: userId => dispatch(gotCart(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)

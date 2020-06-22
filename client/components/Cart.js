import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import { gotItem,  } from '../store/cart'
import {getPictures} from '../store/shop'
import {CustomPlaceholder} from 'react-placeholder-image'

export class Cart extends React.Component {
  // constructor(){

  // }
  render() {
    return (
      <div className="cart-container">
        <h1 className="heading">Cart</h1>

        <div className="item-container">
          {/* placeholder image */}
          <CustomPlaceholder width={100} height={100} />
        </div>
      </div>
    )
  }
}

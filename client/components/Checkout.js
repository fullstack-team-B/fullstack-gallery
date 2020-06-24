import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Checkout extends React.Component {
  render() {
    return (
      <div>
        <h1>Order Compelete</h1>
      </div>
    )
  }
}

export default connect()(Checkout)

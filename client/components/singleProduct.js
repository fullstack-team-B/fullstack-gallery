import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchPicture, addToCart} from '../store/shop'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const pictureId = this.props.match.params.pictureId
    this.props.fetchPicture(pictureId)
  }

  handleAddToCart = pictureId => {
    console.log(pictureId)
    this.props.addToCart(pictureId, this.props.userId)
  }
  //
  render() {
    const picture = this.props.picture[0]
    console.log('Single Product Props: ', this.props)

    return picture ? (
      <div>
        <h2>{picture.name}</h2>
        <img id="pictureImg" src={picture.imageUrl} />
        <p>{picture.description}</p>
        <button type="button" onClick={() => this.handleAddToCart(picture.id)}>
          Add To Cart
        </button>
      </div>
    ) : (
      <h1> Loading </h1>
    )
  }
}

const mapState = state => {
  return {
    picture: state.pictures,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPicture: pictureId => dispatch(fetchPicture(pictureId)),
    addToCart: (pictureId, userId) => dispatch(addToCart(pictureId, userId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

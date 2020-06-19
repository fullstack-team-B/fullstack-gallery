import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPicture} from '../store/shop'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const pictureId = this.props.match.params.pictureId
    this.props.fetchPicture(pictureId)
  }

  addToCart = pictureId => {}

  render() {
    const picture = this.props.picture[0]
    console.log(this.props)
    return (
      <div>
        <h2>{picture.name}</h2>
        <img id="pictureImg" src={picture.imageUrl} />
        <p>{picture.description}</p>
        <button type="button" onClick={() => this.addToCart(picture.id)}>
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    picture: state.pictures
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPicture: pictureId => dispatch(fetchPicture(pictureId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
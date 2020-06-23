import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchPicture, gotItem} from '../store'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const pictureId = this.props.match.params.pictureId
    this.props.fetchPicture(pictureId)
  }

  render() {
    const picture = this.props.picture[0]

    return picture ? (
      <div>
        <h2>{picture.name}</h2>
        <img id="pictureImg" src={picture.imageUrl} />
        <p>{picture.description}</p>
        <button
          type="button"
          onClick={() => this.props.gotItem(picture, this.props.userId)}>
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
    gotItem: (item, userId) => dispatch(gotItem(item, userId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

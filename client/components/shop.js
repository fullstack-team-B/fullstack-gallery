import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPictures} from '../store/shop'

export class Shop extends React.Component {
  componentDidMount() {
    this.props.getPictures()
  }

  render() {
    const pictures = this.props.pictures
    console.log(this.props)

    return (
      <div className="shop-container">
        <h1 className="heading">Shop</h1>
        <ul className="picture-container">
          {pictures.map(picture => {
            return (
              <li key={picture.id}>
                <img id="pictureImg" src={picture.imageUrl} />
                <div className="detail">
                  <h3 id="pictureName">{picture.name}</h3>
                  <h3 id="picturePrice">{picture.price}</h3>
                  <p id="pictureDescription">{picture.description}</p>
                  <Link to={`/shop/picture/${picture.id}`}>More Info</Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    pictures: state.pictures,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPictures: () => dispatch(getPictures())
  }
}

export default connect(mapState, mapDispatch)(Shop)

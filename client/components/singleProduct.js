import React from 'react'
import {connect} from 'react-redux'
import {fetchPicture, gotItem} from '../store'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const pictureId = this.props.match.params.pictureId
    this.props.fetchPicture(pictureId)
  }

  render() {
    const picture = this.props.picture[0]

    return picture ? (
      <Box display="flex" style={{padding: 24, margin: 24}}>
        <Box>
          <img id="pictureImg" src={picture.imageUrl} height={400} />
        </Box>
        <Box
          display="flex"
          style={{padding: 24, margin: 24}}
          flexDirection="column"
        >
          <Typography variant="h4">{picture.name}</Typography>

          <Typography variant="subtitle1">{picture.description}</Typography>
          <Button
            variant="contained"
            color="primary"
            // type="button"
            onClick={() => this.props.gotItem(picture, this.props.userId)}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>
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

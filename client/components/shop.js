import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPictures} from '../store/shop'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const styles = theme => ({
  root: {
    flexGrow: 12
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

export class Shop extends React.Component {
  componentDidMount() {
    this.props.getPictures()
  }

  render() {
    const pictures = this.props.pictures
    const {classes} = this.props

    return (
      <div>
        <Typography variant="h4" style={{margin: 24}}>
          Shop
        </Typography>
        <Grid
          container
          spacing={3}
          style={{padding: 24}}
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {pictures.map(picture => {
            return (
              <Grid item xs={4} key={picture.id}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      component="img"
                      image={picture.imageUrl}
                      title={picture.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {picture.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {picture.description}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        $ {picture.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions>
                    <Link to={`/shop/picture/${picture.id}`}>
                      <Button size="small" color="primary">
                        More Info
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

const mapState = state => {
  return {
    pictures: state.pictures
    // userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPictures: () => dispatch(getPictures())
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Shop))

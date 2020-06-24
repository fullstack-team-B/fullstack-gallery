import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Toolbar} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 12
  },

  title: {
    flexGrow: 1
  }
}))

const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img className="logo" src="./favicon.ico" alt="logo" />

          <Typography variant="h4" className={classes.title}>
            Fullstack Gallery
          </Typography>

          <nav className="nav_links">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <div>
                  <Link className="account" to="/account">
                    ACCOUNT
                  </Link>
                </div>
                <div>
                  <a href="#" onClick={handleClick}>
                    LOGOUT
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">
                  <Button color="inherit">LOGIN</Button>
                </Link>

                <Link to="/signup">
                  <Button color="inherit">SIGN UP</Button>
                </Link>
              </div>
            )}

            <Link className="shop" to="/shop">
              <Button color="inherit">Shop</Button>
            </Link>

            <Link className="cart" to="/cart">
              <Button color="inherit">Cart</Button>
            </Link>
          </nav>
          <hr />
        </Toolbar>
      </AppBar>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

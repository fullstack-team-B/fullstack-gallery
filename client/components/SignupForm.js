import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
/**
 * COMPONENT
 */
const SignupForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography
        align="center"
        component="h1"
        variant="h5"
        style={{padding: 20}}
      >
        Sign up
      </Typography>

      <form onSubmit={handleSubmit} name={name} className={classes.form}>
        <TextField
          id="firstName"
          label="First Name"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          id="lastName"
          label="Last Name"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          id="email"
          label="Email Address"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          id="password"
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          className={classes.submit}
        >
          {displayName}
        </Button>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(signup(firstName, lastName, email, password, formName))
    }
  }
}

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(SignupForm)

/**
 * PROP TYPES
 */
SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Shop} from './shop'
export {default as SingleProduct} from './singleProduct'
export {default as Navbar} from './navbar'
export {default as UserAccount} from './UserAccount'
export {Signup} from './signup-form'
export {Login} from './auth-form'

# Fullstack Gallery

Welcome to Fullstack Gallery!
Your place to browse and purchase wacky named pictures

## Features

* More Info: User can click on the more info button to redirect to a single page view of the product they wish to purchase
* Add to Cart: User is able to add and item from the shop page to the cart page
* Edit Cart: User can increase or decrease the current item that exist in their cart
* Check Out: User can click the checkout button to checkout the current order

* User Types
* Admin: Access to edit/delete users and products
* Customer: Access to order history

## All Links

* /shop : Displays all items available for purchase
* /signup : Creates a new user account
* /login : Logs into an existing user account
* /account : Displays current account information for the current logged in user
* /logout : Logs out current logged in user
* /cart : Displays current cart for a user

## API Routes

* /api/cart
* GET /api/cart/:userId
* POST /api/cart/
* PUT /api/cart/:userId/increase
* PUT /api/cart/:userId/decrease
* POST /api/cart/submit
* DELETE /api/cart/removeItem
* DELETE /api/cart/clearCart

* /api/pictures
* GET /api/pictures/
* GET /api/pictures/:pictureId
* POST /api/pictures/
* DELETE /api/pictures/:pictureId
* PUT /api/pictures/:pictureId

* /api/users
* GET /api/users/
* GET /api/users/:userId
* POST /api/users/
* DELETE /api/users/:userId

## Database Models

* users
* picturelist
* orderQuantity
* order
* category

<--->Currently not being used

* address
* artist
* inventory

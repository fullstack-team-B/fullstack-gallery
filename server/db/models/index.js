const User = require('./user')
const Address = require('./address')
const Artist = require('./artist')
const Category = require('./category')
const Inventory = require('./inventory')
const Order = require('./order')
const PaymentMethod = require('./paymentMethod')
const PictureList = require('./picturelist')
const OrderQuantity = require('./orderQuantity')

//  User to Address Association
Address.belongsTo(User)
User.hasOne(Address)

// User to Order Association
Order.belongsTo(User)
User.hasMany(Order)

// User to Payment Method Association
PaymentMethod.belongsTo(User)
User.hasMany(PaymentMethod)

// Category to PictureList Association
PictureList.belongsTo(Category)
Category.hasMany(PictureList)

// Artist to PictureList Association
PictureList.belongsTo(Artist)
Artist.hasMany(PictureList)

// Order Detail | Picture List to Orders Association
PictureList.belongsToMany(Order, {through: OrderQuantity})
Order.belongsToMany(PictureList, {through: OrderQuantity})

module.exports = {
  User,
  Address,
  Artist,
  Category,
  Inventory,
  Order,
  PaymentMethod,
  PictureList,
  OrderQuantity
}

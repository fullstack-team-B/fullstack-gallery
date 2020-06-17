const User = require('./user')
const Address = require('./address')
const Artist = require('./artist')
const Category = require('./category')
const Inventory = require('./inventory')
const Order = require('./order')
const PaymentMethods = require('./paymentMethod')
const PictureList = require('./picturelist')
const OrderDetail = require('./orderDetails')

//  User to Address Association
Address.belongsTo(User)
User.hasMany(Address)

// User to Order Association
Order.belongsTo(User)
User.hasMany(Order)

// User to Payment Method Association
PaymentMethods.belongsTo(User)
User.hasMany(PaymentMethods)

// Category to PictureList Association
PictureList.belongsTo(Category)
Category.hasOne(PictureList)

// Artist to PictureList Association
PictureList.belongsTo(Artist)
Artist.hasMany(PictureList)

// Order Detail | Picture List to Orders Association
PictureList.belongsToMany(Order, {through: 'orderDetail'})
Order.belongsToMany(PictureList, {through: 'orderDetail'})

module.exports = {
  User,
  Address,
  Artist,
  Category,
  Inventory,
  Order,
  PaymentMethods,
  PictureList,
  OrderDetail
}

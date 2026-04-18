const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Setting = require("./Setting");

// Relationships
// User - Order
User.hasMany(Order);
Order.belongsTo(User);

// Order - OrderItem
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product - OrderItem
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

// Category - Product
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Setting,
};
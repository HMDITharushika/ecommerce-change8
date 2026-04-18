const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");

// Relationships
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  User,
  Product,
  Category,
};
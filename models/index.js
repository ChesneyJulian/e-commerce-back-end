// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Categories have many Products
// define foreign key
Category.hasMany(Product, {
  foreignKey: 'category_id'
});
// Products belongsTo Category
// define foreign key
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})
// Products belongToMany Tags (through ProductTag)
// define foreign key
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});
// Tags belongToMany Products (through ProductTag)
// define foreign key
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

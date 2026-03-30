const Product = require("../model/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product");
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;

  const product = new Product(title);
  product.save();

  res.redirect("/");
};
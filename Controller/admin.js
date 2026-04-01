const Product = require("../model/product");
const Cart = require("../models/cart");

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.deleteById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/");
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product");
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description);
  product.save();

  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.query.productId;

  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/add-product", {
      product: product,
      editing: editMode
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  const updatedProduct = new Product(title, price, description);
  updatedProduct.id = id;

  Product.updateProduct(updatedProduct, () => {
    res.redirect("/");
  });
};

const Cart = require("../models/cart");

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.deleteById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/");
  });
};
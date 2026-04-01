const Product = require("../model/product");
const Cart = require("../models/cart");


exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/"); 
    }

    res.render("shop/product-detail", {
      product: product,
    });
  });
};

const Cart = require("../models/cart");

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {

      const cartProducts = [];

      if (cart) {
        for (let prod of cart.products) {
          const productData = products.find(p => p.id === prod.id);
          cartProducts.push({
            productData: productData,
            qty: prod.qty
          });
        }
      }

      res.render("shop/cart", {
        products: cartProducts,
        totalPrice: cart ? cart.totalPrice : 0
      });
    });
  });
};
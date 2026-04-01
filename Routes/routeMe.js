const express = require("express");
const router = express.Router();

const adminController = require("../Controller/admin");

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);

router.get("/", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.post("/cart", shopController.postCart);

router.get("/cart", shopController.getCart);

router.get("/edit-product", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
const express = require("express");
const router = express.Router();

const adminController = require("../Controller/admin");

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);

router.get("/", shopController.getProducts);

module.exports = router;
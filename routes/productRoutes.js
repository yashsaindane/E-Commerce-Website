// productRoutes.js
const express = require("express");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const Product = require("../models/product");
const router = express.Router();

router.get("/cart", productController.getCartPage);

// ===============================================
router.post("/checkout", productController.checkout);
router.get("/orderplace", orderController.getOrderPlacePage);
router.get("/productList", productController.getProductList);
module.exports = router;

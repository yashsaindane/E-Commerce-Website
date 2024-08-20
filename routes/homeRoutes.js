// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.renderLogin);
router.get('/home', homeController.renderHome);
router.get('/productInfo', homeController.renderProductInfo);
router.get('/cart', homeController.renderCart);
router.get('/checkout', homeController.renderCheckout);
router.get('/orderPlace', homeController.renderOrderPlace);
router.get('/profile', homeController.renderProfile);
router.get('/login', homeController.renderLogin);

module.exports = router;

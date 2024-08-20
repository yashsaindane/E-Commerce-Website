// controllers/homeController.js
const homeController = {};

homeController.renderLogin = (req, res) => {
  res.render('user/login.ejs');
};

homeController.renderHome = (req, res) => {
  res.render('user/home.ejs');
};

homeController.renderProductInfo = (req, res) => {
  res.render('user/productInfo.ejs');
};

homeController.renderCart = (req, res) => {
  res.render('user/cart.ejs');
};

homeController.renderCheckout = (req, res) => {
  res.render('user/checkout.ejs');
};

homeController.renderOrderPlace = (req, res) => {
  res.render('user/orderPlace.ejs');
};

homeController.renderProfile = (req, res) => {
  res.render('user/profile.ejs');
};

homeController.renderLogin = (req, res) => {
  res.render('user/login.ejs');
};

module.exports = homeController;

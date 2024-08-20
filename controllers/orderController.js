const path = require('path');

const orderController = {};

orderController.getOrderPlacePage = (req, res) => {
  res.render('/orderPlace')
};

module.exports = orderController;
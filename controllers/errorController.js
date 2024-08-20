// errorController.js
const errorController = {};

errorController.handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong in code!');
};

module.exports = errorController;

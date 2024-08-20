// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const user = require('../models/user');

router.post('/login_sign', userController.loginSignUp); 

router.get('/userList', userController.userListController);

module.exports = router;

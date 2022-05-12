const express = require('express');
const authController = require('../controllers/authController');
const Router = express.Router();

Router.get('/token', authController.getRefreshToken);
Router.post('/register', authController.postRegister);
Router.get('/user/:username', authController.getUsernameExistance);

module.exports = Router;

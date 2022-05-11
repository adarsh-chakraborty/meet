const express = require('express');
const authController = require('../controllers/authController');
const Router = express.Router();

Router.get('/refresh', authController.getRefreshToken);
Router.post('/register', authController.postRegister);

module.exports = Router;

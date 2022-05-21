const express = require('express');
const authController = require('../controllers/authController');
const Router = express.Router();

Router.post('/', authController.postRefreshAccessToken);
Router.get('/token', authController.getRefreshToken);
Router.post('/register', authController.postRegister);
Router.post('/login', authController.postLogin);
Router.get('/user/:username', authController.getUsernameExistance);
Router.post('/peerid', authController.postUserNameForPeerId);

module.exports = Router;

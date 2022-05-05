const express = require('express');
const authController = require('../controllers/authController');
const Router = express.Router();

Router.get('/refresh', authController.getRefreshToken);

module.exports = Router;

const express = require('express');
const homeRoutes = require('../controllers/homeRoutes');
const Router = express.Router();

Router.get('/', homeRoutes.getHome);

module.exports = Router;

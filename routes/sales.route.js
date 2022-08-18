const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const salesRoute = Router();

salesRoute.post('/', salesController.createSale);

module.exports = salesRoute;
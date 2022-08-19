const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const salesProductsValidator = require('../middlewares/salesProducts.validator');

const salesRoute = Router();

salesRoute.post('/',
  salesProductsValidator.validateProductId,
  salesProductsValidator.validateQuantity,
  salesController.createSale);

module.exports = salesRoute;
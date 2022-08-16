const { Router } = require('express');
const productsController = require('../controllers/product.controller');

const productsRoute = Router();

productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getProductsById);

module.exports = productsRoute;

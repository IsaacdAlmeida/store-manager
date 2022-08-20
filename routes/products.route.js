const { Router } = require('express');
const productsController = require('../controllers/product.controller');
const productValidator = require('../middlewares/products.validators');

const productsRoute = Router();

productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getProductsById);
productsRoute.post('/', productValidator.validateName, productsController.createProduct);
productsRoute.put('/:id', productValidator.validateName, productsController.updateProduct);

module.exports = productsRoute;

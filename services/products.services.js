const ProductsModel = require('../models/Products');
const NotFoundError = require('../errors/NotFoundError');

const productsServices = {
  getAllProducts: async () => {
    const allProducts = await ProductsModel.getAllProducts();

    return allProducts;
  },
  getProductsById: async (id) => {
    const product = await ProductsModel.getByPk(id);
    
    if (!product) throw new NotFoundError('Product not found');

    return product;
  },
};

module.exports = productsServices;
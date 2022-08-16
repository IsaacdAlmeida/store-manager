const ProductsModel = require('../models/Products');
const CustomError = require('../errors/CustomError');

const productsServices = {
  getAllProducts: async () => {
    const allProducts = await ProductsModel.getAllProducts();

    return allProducts;
  },
  getProductsById: async (id) => {
    const product = await ProductsModel.getByPk(id);
    
    if (!product) throw new CustomError.NotFound('Product not found');

    return product;
  },
};

module.exports = productsServices;
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

  createProduct: async (name) => {
    const product = await ProductsModel.createProduct(name);

    return product;
  },

  updateProduct: async (id, name) => {
    const product = await ProductsModel.updateProduct(id, name);
    const { affectedRows } = product; // retorna 1 ou 0

    if (affectedRows === 0) throw new NotFoundError('Product not found');
    
    return affectedRows;
  },
};

module.exports = productsServices;
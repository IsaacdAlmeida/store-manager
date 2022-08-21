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
    const response = await ProductsModel.updateProduct(id, name);
    const { affectedRows } = response; // retorna 1 ou 0

    if (affectedRows === 0) throw new NotFoundError('Product not found');
    
    return affectedRows;
  },

  deleteProduct: async (id) => {
    const response = await ProductsModel.deleteProduct(id);
    const { affectedRows } = response;

    if (affectedRows === 0) throw new NotFoundError('Product not found');

    return affectedRows;
  },

  searchProduct: async (q) => {
    const product = await ProductsModel.searchProduct(q);

    if (product.length === 0) await ProductsModel.getAllProducts();

    return product;
  },
};

module.exports = productsServices;
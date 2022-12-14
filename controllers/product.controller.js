const productsServices = require('../services/products.services');

const productsController = {
  getAllProducts: async (req, res) => {
    const allProducts = await productsServices.getAllProducts();

    res.status(200).json(allProducts);
  },

  getProductsById: async (req, res) => {
    const { id } = req.params;
    const product = await productsServices.getProductsById(id);

    return res.status(200).json(product);
  },

  createProduct: async (req, res) => {
    const { name } = req.body;

    const product = await productsServices.createProduct(name);
    return res.status(201).json(product);
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    await productsServices.updateProduct(id, name);
    
    return res.status(200).json({ id, name });
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;

    await productsServices.deleteProduct(id);

    return res.status(204).end();
  },

  searchProduct: async (req, res) => {
    const { q } = req.query;

    const searchProduct = await productsServices.searchProduct(q);

    return res.status(200).json(searchProduct);
  },
};

module.exports = productsController;
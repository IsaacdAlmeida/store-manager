const SalesModel = require('../models/Sales');
const SalesProductModel = require('../models/SalesProducts');
const ProductsModel = require('../models/Products');
const NotFoundError = require('../errors/NotFoundError');

const salesServices = {
  getAllSales: async () => {
    const allSales = await SalesModel.getAllsales();

    return allSales;
  },

  getSaleById: async (id) => {
    const sale = await SalesModel.getByPk(id);

    if (!sale) throw new NotFoundError('Sale not found');

    return sale;
  },

  createSale: async (arrayOfSales) => {
    const allProducts = await ProductsModel.getAllProducts();
    const allProductsIds = allProducts.map((item) => item.id);

    const salesProductId = arrayOfSales.map((item) => item.productId);

    salesProductId.forEach((item) => {
      if (!allProductsIds.includes(item)) {
        throw new NotFoundError('Product not found');
      }
    });

    const saleId = await SalesModel.createSale(arrayOfSales);

    await Promise.all(arrayOfSales
      .map((item) => SalesProductModel.createSale(saleId, item)));
    
    return {
      id: saleId,
      itemsSold: [...arrayOfSales],
    };
  },

  updateSale: async (id, body) => {
    const sale = await SalesModel.getByPk(id);

    if (!sale) throw new NotFoundError('Sale not found');

    const allProducts = await ProductsModel.getAllProducts();
    const allProductsIds = allProducts.map((item) => item.id);

    const salesProductId = body.map((item) => item.productId);

    salesProductId.forEach((productsale) => {
      if (!allProductsIds.includes(productsale)) {
        throw new NotFoundError('Product not found');
      }
    });

    await Promise.all(body
      .map((item) => SalesProductModel.updateSale(id, item)));

    return {
      saleId: id,
      itemsUpdated: body,
    }; 
  },

  deleteSale: async (id) => {
    const response = await SalesModel.deleteSale(id);
    const { affectedRows } = response;

    if (affectedRows === 0) throw new NotFoundError('Sale not found');

    return affectedRows;
  },
};

module.exports = salesServices;

const SalesModel = require('../models/Sales');
const SalesProductModel = require('../models/SalesProducts');
const ProductsModel = require('../models/Products');
const NotFoundError = require('../errors/NotFoundError');

const salesServices = {
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
};

module.exports = salesServices;

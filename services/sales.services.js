const SalesModel = require('../models/Sales');

const salesServices = {
  createSale: async (arrayOfSales) => {
    const saleId = await SalesModel.createSale(arrayOfSales);

    return {
      id: saleId,
    };
  },
};

module.exports = salesServices;

// nota: o arrayOfSales é o req.body que passamos no controller
// saleId é o ID que recebemos quando fazemos a requisição, ele retorna o id cadastrado na tabela sales. Esse id deve ser passado num objeto que contém o id e os produtos com as quantidades.

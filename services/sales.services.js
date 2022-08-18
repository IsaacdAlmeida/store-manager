const SalesModel = require('../models/Sales');
const SalesProductModel = require('../models/SalesProducts');

const salesServices = {
  createSale: async (arrayOfSales) => {
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

// nota: o arrayOfSales é o req.body que passamos no controller
// saleId é o ID que recebemos quando fazemos a requisição, ele retorna o id cadastrado na tabela sales. Esse id deve ser passado num objeto que contém o id e os produtos com as quantidades.

// fazemos um map do arrayOfSales, queremos executar uma query diferente cada vez que passarmos por cada item do array de sales. Dessa forma, criamos na tabela de sales_product linhas com o mesmo id do sale product, o produto vendido e a quantidade.

// o retorno deve ser, conforme pedido no requisito um objeto com a chave id, contendo o id da tabela sales e outra chave com o array de itens vendidos e quantidades.
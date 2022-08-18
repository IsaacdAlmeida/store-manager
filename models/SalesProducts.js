const connection = require('./connection');

const SalesProducts = {
  createSale: async (id, item) => {
    await connection.query(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);
    `, [id, item.productId, item.quantity]);
  },
};

module.exports = SalesProducts;

// sales product recebe:
// product_id / sales_id / quantidade
// product_id é fk da tabela products
// sales_id é fk da tabela sales
// quantidade é um inteiro.
// nessa requisição devemos pegar então as duas PK e a quantidade que vem da requisição

// a função que cria uma nova venda com o produto deve receber dois parâmetros
// o id da venda
// o outro com os produtosID e quantidades
// o map 
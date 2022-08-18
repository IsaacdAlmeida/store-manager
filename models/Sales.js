const connection = require('./connection');

const Sales = {
  createSale: async () => {
    const [sale] = await connection.query(`
    INSERT INTO StoreManager.sales (date)
    VALUES (DEFAULT);
    `);
    const saleId = sale.insertId;

    return saleId;
  },
};

module.exports = Sales;

// aqui a gente só deve inserir um valor default
// a tabela sales já recebe automaticamente id e date
// dessa forma, quando a gente passar no service, criamos esse registro
// e vinculamos a tabela sales_product que recebe o id gerado e produtos/quantidades
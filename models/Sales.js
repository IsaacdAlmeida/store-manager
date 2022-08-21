const connection = require('./connection');

const Sales = {
  getAllsales: async () => {
    const [sales] = await connection.query(`
    SELECT
    SP.sale_id AS saleId,
    S.date AS date,
    SP.product_id AS productId,
    SP.quantity AS quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON S.id = SP.sale_id
    ORDER BY sale_id ASC, product_id ASC;
    `);

    return sales;
  },

  getByPk: async (id) => {
    const [sale] = await connection.query(`
    SELECT
    S.date AS date,
    SP.product_id AS productId,
    SP.quantity AS quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON S.id = SP.sale_id
    WHERE S.id = ?;
    `, [id]);

    if (sale.length === 0) return null;

    return sale;
  },

  createSale: async () => {
    const [sale] = await connection.query(`
    INSERT INTO StoreManager.sales (date)
    VALUES (DEFAULT);
    `);
    const saleId = sale.insertId;

    return saleId;
  },

  deleteSale: async (id) => {
    const [response] = await connection.query(`
    DELETE FROM StoreManager.sales
    WHERE id = ?;
    `, [id]);

    return response;
  },
};

module.exports = Sales;

// aqui a gente só deve inserir um valor default
// a tabela sales já recebe automaticamente id e date
// dessa forma, quando a gente passar no service, criamos esse registro
// e vinculamos a tabela sales_product que recebe o id gerado e produtos/quantidades
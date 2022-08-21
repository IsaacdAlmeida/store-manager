const connection = require('./connection');

const SalesProducts = {
  createSale: async (id, item) => {
    const [sale] = await connection.query(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);
    `, [id, item.productId, item.quantity]);

    return (sale);
  },

  updateSale: async (id, body) => {
    const sale = await connection.query(`
    UPDATE StoreManager.sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`, [body.quantity, id, body.productId]);

    return sale;
  },
};

module.exports = SalesProducts;

const connection = require('./connection');

const SalesProducts = {
  createSale: async (id, item) => {
    const [sale] = await connection.query(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);
    `, [id, item.productId, item.quantity]);

    return (sale);
  },
};

module.exports = SalesProducts;

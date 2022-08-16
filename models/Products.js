const connection = require('./connection');

const Products = {
  getAllProducts: async () => {
    const [products] = await connection.query(`
    SELECT * FROM StoreManager.products;
    `);

    return products;
  },

  getByPk: async (id) => {
    const [[product]] = await connection.query(`
    SELECT * FROM StoreManager.products
    WHERE id = ?;
    `, [id]);

    if (!product) return null;

    return product;
  },
};

module.exports = Products;
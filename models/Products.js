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

  createProduct: async (name) => {
    const [product] = await connection.query(`
    INSERT INTO StoreManager.products (name)
    VALUES(?);
    `, [name]);

    const createdProduct = { id: product.insertId, name };

    return createdProduct;
  },
};

module.exports = Products;
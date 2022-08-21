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
    // console.log(createdProduct); retorna objeto id e name
    return createdProduct;
  },

  updateProduct: async (id, name) => {
    const [product] = await connection.query(`
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;
    `, [name, id]);

    // retorna um objeto com várias chaves: queremos affectedRows

    return product;
  },

  deleteProduct: async (id) => {
    const [response] = await connection.query(`
    DELETE FROM StoreManager.products
    WHERE id = ?;
    `, [id]);

    return response;
  },

  searchProduct: async (q) => {
    const [product] = await connection.query(`
    SELECT * FROM StoreManager.products 
    WHERE name LIKE ?;
    `, [`%${q}%`]);

    return product;
  },
};

module.exports = Products;
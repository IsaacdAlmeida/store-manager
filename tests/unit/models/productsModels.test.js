const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/Products');

/* const mock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
] */


describe('Exibe todos os produtos do BD na camada Models', () => {
  describe('Quando há produtos registrados', () => {
    before(() => {
      const mockResult = [[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      ], []];

      sinon.stub(connection, 'execute').resolves(mockResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await ProductsModel.getAllProducts();
      
      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await ProductsModel.getAllProducts();

      expect(result).to.not.be.empty;
    });

    it('Os elementos do array devem ser objetos', async () => {
      const result = await ProductsModel.getAllProducts();

      expect(result[0]).to.be.an('object');
    });

    it('Deve incluir as chaves id e name', async () => {
      const result = await ProductsModel.getAllProducts();

      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });
});

describe('Busca um produtos no BD pelo ID na camada Models', () => {
  describe('Quando o produto é encontrado', () => {
    before(() => {
      const mockResult = [[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ], []];

      sinon.stub(connection, 'execute').resolves(mockResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await ProductsModel.getByPk(1);

      expect(result).to.be.an('object');
    });

    it('O objeto não deve estar vazio', async () => {
      const result = await ProductsModel.getByPk(1);

      expect(result).to.not.be.empty;
    });

    it('Deve incluir as chaves id e name', async () => {
      const result = await ProductsModel.getByPk(1);

      expect(result).to.include.all.keys('id', 'name');
    });
  });

  describe('Quando o produto não é encontrado', () => {
    before(() => {
      const mockResult = [[], []];

      sinon.stub(connection, 'execute').resolves([mockResult]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um valor Null', async () => {
      const result = await ProductsModel.getByPk(200);

      expect(result).to.be.equal(null);
    });
  })
});
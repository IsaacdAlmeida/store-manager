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


describe('Exibe todos os produtos do BD', () => {
  describe('Quando há protudos registrados', () => {
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

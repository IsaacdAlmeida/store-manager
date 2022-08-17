const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const productsServices = require('../../../services/products.services');
const ProductsModel = require('../../../models/Products');

describe('Exibe todos os produtos do BD', () => {
  describe('Quando há protudos registrados', () => {
    before(() => {
      const mockResult = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      ];

      sinon.stub(ProductsModel, 'getAllProducts').resolves(mockResult);
    });

    after(() => {
      ProductsModel.getAllProducts.restore();
    });

    it('Retorna um array', async () => {
      const result = await productsServices.getAllProducts();

      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await productsServices.getAllProducts();

      expect(result).to.not.be.empty;
    });

    it('Os elementos do array devem ser objetos', async () => {
      const result = await productsServices.getAllProducts();

      expect(result[0]).to.be.an('object');
    });

    it('Deve incluir as chaves id e name', async () => {
      const result = await productsServices.getAllProducts();

      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });
});


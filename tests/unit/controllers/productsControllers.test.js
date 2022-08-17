const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const productsController = require('../../../controllers/product.controller');
const productsServices = require('../../../services/products.services');

describe('Exibe todos os produtos do BD na camada Controller', () => {
  describe('Quando há produtos registrados', () => {
    
    const request = {};
    const response = {};

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

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAllProducts').resolves(mockResult);
    });

    after(() => {
      productsServices.getAllProducts.restore();
    });

    it('Retorna o status 200', async () => {
      await productsController.getAllProducts(request, response);
      
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um array', async () => {
      const products = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      ];

      await productsController.getAllProducts(request, response);
      expect(response.json.calledWith(products)).to.be.equal(true);
    });
  });
});

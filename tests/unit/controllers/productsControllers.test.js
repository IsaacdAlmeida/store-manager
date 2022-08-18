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

describe('Exibe o produto buscado por ID na camada Controller', () => {
  describe('Quando há produtos registrados', () => {

    const request = {};
    const response = {};

    before(() => {
      const mockResult = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      request.params = { id: '1' }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getProductsById').resolves(mockResult);
    });

    after(() => {
      productsServices.getProductsById.restore();
    });

    it('Retorna o status 200', async () => {
      await productsController.getProductsById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um objeto', async () => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      await productsController.getProductsById(request, response);
      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });
});

describe('Insere um novo produto no BD na camada Controller', () => {
  describe('Quando um produto é inserido corretamente', () => {

    const request = {};
    const response = {};
    before(() => {
      const mockResult = {
        "id": 4,
        "name": "espada justiceira"
      };

      request.body = { name: 'espada justiceira' }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'createProduct').resolves(mockResult);
    });

    after(() => {
      productsServices.createProduct.restore();
    });

    it('Retorna o status 201', async () => {
      await productsController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('Retorna um objeto', async () => {
      const product = {
        "id": 4,
        "name": "espada justiceira"
      };

      await productsController.createProduct(request, response);
      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });
});
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

describe('atualiza produto no BD na camada Controller', () => {
  describe('Quando um produto é atualizado corretamente', () => {

    const request = {};
    const response = {};
    before(() => {
      const mockResult = {
        "id": 1,
        "name": "espada justiceira"
      };

      request.params = { id: 1 }
      request.body = { name: 'espada justiceira' }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'updateProduct').resolves(mockResult);
    });

    after(() => {
      productsServices.updateProduct.restore();
    });

    it('Retorna o status 200', async () => {
      await productsController.updateProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um objeto', async () => {
      const product = {
        "id": 1,
        "name": "espada justiceira"
      };

      await productsController.updateProduct(request, response);
      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });
});

describe('deleta produto no BD na camada Controller', () => {
  describe('Quando um produto é deletado corretamente', () => {

    const request = {};
    const response = {};
    before(() => {
      
      request.params = { id: '1' }
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
      sinon.stub(productsServices, 'deleteProduct').resolves();
    });

    after(() => {
      productsServices.deleteProduct.restore();
    });

    it('Retorna o status 204', async () => {
      await productsController.deleteProduct(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it('Não retorna nenhuma mensagem', async () => {
      
      await productsController.deleteProduct(request, response);
      expect(response.end.calledWith()).to.be.equal(true);
    });
  });
});

describe('procura produto no BD na camada Controller', () => {
  describe('Quando um produto é encontrado', () => {
    const request = {};
    const response = {};
    
    before(() => {
      const mockResult = [
        {
          "id": 2,
          "name": "Traje de encolhimento"
        }
      ];

      request.query = { q: 'Traje' }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'searchProduct').resolves(mockResult);
    });

    after(() => {
      productsServices.searchProduct.restore();
    });

    it('Retorna o status 200', async () => {
      await productsController.searchProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna o array com os produtos encontrados', async () => {
      const searchedProducts = [
        {
          "id": 2,
          "name": "Traje de encolhimento"
        }
      ];

      await productsController.searchProduct(request, response);
      expect(response.json.calledWith(searchedProducts)).to.be.equal(true);
    });
  });
});


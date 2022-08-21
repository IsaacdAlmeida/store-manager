const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const salesController = require('../../../controllers/sales.controller');
const salesServices = require('../../../services/sales.services');

describe('Exibe todas as vendas do BD na camada Controller', () => {
  describe('Quando há vendas registrados', () => {

    const request = {};
    const response = {};

    before(() => {
      const mockResult = [
        {
          "saleId": 1,
          "date": "2022-08-20T17:54:14.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2022-08-20T17:54:14.000Z",
          "productId": 1,
          "quantity": 2
        },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getAllSales').resolves(mockResult);
    });

    after(() => {
      salesServices.getAllSales.restore();
    });

    it('Retorna o status 200', async () => {
      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um array', async () => {
      const products = [
        {
          "saleId": 1,
          "date": "2022-08-20T17:54:14.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2022-08-20T17:54:14.000Z",
          "productId": 1,
          "quantity": 2
        },
      ];

      await salesController.getAllSales(request, response);
      expect(response.json.calledWith(products)).to.be.equal(true);
    });
  });
});

describe('Exibe uma venda buscada pelo ID na camada Controller', () => {
  describe('Quando há produtos registrados', () => {

    const request = {};
    const response = {};

    before(() => {
      const mockResult = [
        {
          "date": "2022-08-20T17:54:14.000Z",
          "productId": 3,
          "quantity": 15
        }
      ];

      request.params = { id: '2' }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSaleById').resolves(mockResult);
    });

    after(() => {
      salesServices.getSaleById.restore();
    });

    it('Retorna o status 200', async () => {
      await salesController.getSaleById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um objeto', async () => {
      const product = [
        {
          "date": "2022-08-20T17:54:14.000Z",
          "productId": 3,
          "quantity": 15
        }
      ];

      await salesController.getSaleById(request, response);
      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });
});

describe('Insere uma nova venda no BD na camada Controller', () => {
  describe('Quando uma venda é inserido corretamente', () => {

    const request = {};
    const response = {};
    before(() => {
      const mockResult = {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ]
      };

      request.body = [{
        "productId": 1,
        "quantity": 2
      }];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'createSale').resolves(mockResult);
    });

    after(() => {
      salesServices.createSale.restore();
    });

    it('Retorna o status 201', async () => {
      await salesController.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('Retorna um objeto', async () => {
      const sale = {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ]
      };

      await salesController.createSale(request, response);
      expect(response.json.calledWith(sale)).to.be.equal(true);
    });
  });
});

describe('deleta venda no BD na camada Controller', () => {
  describe('Quando a venda é deletada corretamente', () => {

    const request = {};
    const response = {};
    before(() => {

      request.params = { id: '1' }
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
      sinon.stub(salesServices, 'deleteSale').resolves(1);
    });

    after(() => {
      salesServices.deleteSale.restore();
    });

    it('Retorna o status 204', async () => {
      await salesController.deleteSale(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it('Não retorna nenhuma mensagem', async () => {

      await salesController.deleteSale(request, response);
      expect(response.end.calledWith()).to.be.equal(true);
    });
  });
});
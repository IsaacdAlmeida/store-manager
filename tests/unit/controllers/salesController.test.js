const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const salesController = require('../../../controllers/sales.controller');
const salesServices = require('../../../services/sales.services');

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
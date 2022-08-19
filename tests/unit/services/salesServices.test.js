const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')
const { describe } = require('mocha');
const { expect } = require('chai');
const NotFoundError = require('../../../errors/NotFoundError')
const salesServices = require('../../../services/sales.services');
const salesModel = require('../../../models/Sales');
chai.use(chaiAsPromised);


describe('insere uma nova venda no BD na camada Services', () => {
  describe('Quando é inserido um id de produto que não existe', () => {
    it('Um erro deve ser lançado', async () => {
      const result = salesServices.createSale([
        {
          "productId": 100,
          "quantity": 10
        }
      ]);
      expect(result)
        .to.eventually.be.rejectedWith('Product not found')
        .and.be.an.instanceOf(NotFoundError);
    });
  });

/*   describe('Quando é inserido um id de produto que existe', () => {
    before(() => {
      mockResult = {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ]
      }
      sinon.stub(salesModel, 'createSale').resolves(mockResult);
    });

    after(() => {
      salesModel.createSale.restore();
    });

    it('Retorna um objeto', async () => {
      const [result] = await salesServices.createSale([{
        "productId": 1,
        "quantity": 2
      }]);

      expect(result).to.be.an('object');
    });

    it('O objeto não deve estar vazio', async () => {
      const [result] = await salesServices.createSale(mockSale);

      expect(result).to.not.be.empty;
    });

    it('Deve incluir as chaves id e itemsSold', async () => {
      const [result] = await salesServices.createSale(mockSale);

      expect(result).to.include.all.keys('id', 'itemsSold');
    });
  }); */
});
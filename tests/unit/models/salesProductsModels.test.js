const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesProductsModels = require('../../../models/SalesProducts');

describe('Insere uma nova venda na tabela Sales_products na camada Models', () => {
  describe('Quando um produto é inserido com sucesso', () => {
    beforeEach(() => {
      const mockResult = {
        affectedRows: 1,
      };

      sinon.stub(connection, 'execute').resolves(mockResult);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    const mockId = 1
    const mockItem = { productId: 1, quantity: 2 };

    it('Retorna um objeto', async () => {
      const result = await SalesProductsModels.createSale(mockId, mockItem);

      expect(result).to.be.an('object');
    });

    it('O objeto não deve estar vazio', async () => {
      const result = await SalesProductsModels.createSale(mockId, mockItem);

      expect(result).to.not.be.empty;
    });

    it('Deve incluir a chave affectedRows', async () => {
      const result = await SalesProductsModels.createSale(mockId, mockItem);

      expect(result).to.include.all.keys('affectedRows');
    });
  });
})
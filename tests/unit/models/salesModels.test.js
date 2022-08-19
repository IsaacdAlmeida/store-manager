const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModels = require('../../../models/Sales');

describe('insere uma nova venda no BD na camada Models', () => {
  describe('Quando um produto é inserido com sucesso', () => {
    before(() => {
      const mockResult = 1

      sinon.stub(connection, 'execute').resolves(mockResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um número', async () => {
      const result = await SalesModels.createSale();

      expect(result).to.be.an('number');
    });

    it('O número não pode ser menor ou igual a zero', async () => {
      const result = await SalesModels.createSale();

      expect(result).to.be.above(1);
    });
  });
});
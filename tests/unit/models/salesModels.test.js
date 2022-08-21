const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModels = require('../../../models/Sales');

describe('Exibe todas as vendas do BD na camada Models', () => {
  describe('Quando há vendas registradas', () => {
    before(() => {
      const mockResult = [[
      {
        "saleId": 1,
        "date": "2022-08-20T17:06:24.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-08-20T17:06:24.000Z",
        "productId": 1,
        "quantity": 2
      },
      ], []];

      sinon.stub(connection, 'query').resolves(mockResult);
    });

    after(() => {
      connection.query.restore();
    });

    it('Retorna um array', async () => {
      const result = await SalesModels.getAllsales();

      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await SalesModels.getAllsales();

      expect(result).to.not.be.empty;
    });

    it('Os elementos do array devem ser objetos', async () => {
      const result = await SalesModels.getAllsales();

      expect(result[0]).to.be.an('object');
    });

    it('Deve incluir as chaves saleId, date, productId, quantity', async () => {
      const result = await SalesModels.getAllsales();

      expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('Busca uma venda no BD pelo ID na camada Models', () => {
  describe('Quando a venda é encontrado', () => {
    before(() => {
      const mockResult = [[
        {
          "date": "2022-08-20T17:06:24.000Z",
          "productId": 3,
          "quantity": 15
        },
      ], []];

      sinon.stub(connection, 'query').resolves(mockResult);
    });

    after(() => {
      connection.query.restore();
    });

    it('Retorna um array', async () => {
      const result = await SalesModels.getByPk(2);
  
      expect(result).to.be.an('array');
    });

    it('O Array não deve estar vazio', async () => {
      const result = await SalesModels.getByPk(2);

      expect(result).to.not.be.empty;
    });

    it('Deve incluir as chaves date, productId e quantity', async () => {
      const result = await SalesModels.getByPk(2);

      expect(result[0]).to.include.all.keys('date', 'productId', 'quantity');
    });
  });

  describe('Quando o produto não é encontrado', () => {
    before(() => {
      const mockResult = [[], []];

      sinon.stub(connection, 'query').resolves(mockResult);
    });

    after(() => {
      connection.query.restore();
    });

    it('Deve retornar um valor Null', async () => {
      const result = await SalesModels.getByPk(200);

      expect(result).to.be.equal(null);
    });
  })
});

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

describe('deleta uma venda no BD na camada Models', () => {
  describe('Quando uma venda é deletada com sucesso', () => {
    before(() => {
      const mockResult = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      };

      sinon.stub(connection, 'execute').resolves(mockResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await SalesModels.deleteSale(10);

      expect(result).to.be.an('object');
    });

    it('O objeto não deve estar vazio', async () => {
      const result = await SalesModels.deleteSale(10);

      expect(result).to.not.be.empty;
    });

    it('Deve incluir a chave affectedRows', async () => {
      const result = await SalesModels.deleteSale(10);

      expect(result).to.include.all.keys('affectedRows');
    });
  });
});
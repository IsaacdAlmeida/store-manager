const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')
const { describe } = require('mocha');
const { expect } = require('chai');
const salesServices = require('../../../services/sales.services');
const salesModel = require('../../../models/Sales');
const SalesProductModel = require('../../../models/SalesProducts');
const ProductsModel = require('../../../models/Products');
const NotFoundError = require('../../../errors/NotFoundError');
chai.use(chaiAsPromised);


describe('Exibe todos as vendas do BD na camada services', () => {
  describe('Quando há vendas registrados', () => {
    before(() => {
      const mockResult = [
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
      ];

      sinon.stub(salesModel, 'getAllsales').resolves(mockResult);
    });

    after(() => {
      salesModel.getAllsales.restore();
    });

    it('Retorna um array', async () => {
      const result = await salesServices.getAllSales();

      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await salesServices.getAllSales();

      expect(result).to.not.be.empty;
    });

    it('Os elementos do array devem ser objetos', async () => {
      const result = await salesServices.getAllSales();

      expect(result[0]).to.be.an('object');
    });

    it('Deve incluir as chaves saleId, date, productId, quantity', async () => {
      const result = await salesServices.getAllSales();

      expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('Busca uma venda no BD pelo ID na camada Services', () => {
  describe('Quando a venda é encontrado', () => {
    before(() => {
      const mockResult = [
        {
          "date": "2022-08-20T17:32:13.000Z",
          "productId": 3,
          "quantity": 15
        }
      ];

      sinon.stub(salesModel, 'getByPk').resolves(mockResult);
    });

    after(() => {
      salesModel.getByPk.restore();
    });

    it('Retorna um array', async () => {
      const result = await salesServices.getSaleById(2);

      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await salesServices.getSaleById(2);

      expect(result).to.not.be.empty;
    });

    it('Os elementos do array devem ser objetos', async () => {
      const [result] = await salesServices.getSaleById(2);

      expect(result).to.be.an('object');
    });

    it('Deve incluir as chaves date, productId e quantity', async () => {
      const [result] = await salesServices.getSaleById(2);

      expect(result).to.include.all.keys('date', 'productId', 'quantity');
    });

  });

  describe('Quando a venda não é encontrada', () => {
    it('Um erro deve ser lançado', () => {
      const result = salesServices.getSaleById(200);
   
      expect(result)
        .to.eventually.be.rejectedWith('Sale not found')
        .and.be.an.instanceOf(NotFoundError);
    });
  })
});

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
      mockResult = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
      ];
      
      sinon.stub(ProductsModel, 'getAllProducts').resolves(mockResult);
      sinon.stub(salesModel, 'createSale').resolves(3);
      sinon.stub(SalesProductModel, 'createSale').resolves();
    });

    after(() => {
      ProductsModel.getAllProducts.restore();
      salesModel.createSale.restore();
      SalesProductModel.createSale.restore();
    });

    it('Retorna um objeto', async () => {
      const [result] = await salesServices.createSale([{
        "productId": 1,
        "quantity": 2
      }]);

      expect(result).to.be.an('object');
    });

    it('O objeto não deve estar vazio', async () => {
      const [result] = await salesServices.createSale([{
        "productId": 1,
        "quantity": 2
      }]);

      expect(result).to.not.be.empty;
    });

    it('Deve incluir as chaves id e itemsSold', async () => {
      const [result] = await salesServices.createSale([{
        "productId": 1,
        "quantity": 2
      }]);

      expect(result).to.include.all.keys('id', 'itemsSold');
    });
  }); */
});

describe('Deleta uma venda no BD na camada Services', () => {
  describe('Quando a venda é deletada', () => {
    before(() => {
      const mockResult = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      };

      sinon.stub(salesModel, 'deleteSale').resolves(mockResult);
    });

    after(() => {
      salesModel.deleteSale.restore();
    });

    it('Retorna um número', async () => {
      const result = await salesServices.deleteSale(1);

      expect(result).to.be.an('number');
    });

    it('O número deve ser 1', async () => {
      const result = await salesServices.deleteSale(1);

      expect(result).to.deep.equal(1);
    })
  });

  describe('Quando o produto não é encontrado', () => {
    before(() => {
      const mockResult = {
        fieldCount: 0,
        affectedRows: 0,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      };

      sinon.stub(salesModel, 'deleteSale').resolves(mockResult);
    });

    after(() => {
      salesModel.deleteSale.restore();
    });

    it('Um erro deve ser lançado', async () => {
      const result = salesServices.deleteSale(300);
      expect(result)
        .to.eventually.be.rejectedWith('Error: Sale not found')
        .and.be.an.instanceOf(NotFoundError);
    });
  })
});
const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')
const { describe } = require('mocha');
const { expect } = require('chai');
const productsServices = require('../../../services/products.services');
const ProductsModel = require('../../../models/Products');
const NotFoundError = require('../../../errors/NotFoundError')
chai.use(chaiAsPromised);

describe('Exibe todos os produtos do BD na camada services', () => {
  describe('Quando há produtos registrados', () => {
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

      sinon.stub(ProductsModel, 'getAllProducts').resolves(mockResult);
    });

    after(() => {
      ProductsModel.getAllProducts.restore();
    });

    it('Retorna um array', async () => {
      const result = await productsServices.getAllProducts();

      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await productsServices.getAllProducts();

      expect(result).to.not.be.empty;
    });

    it('Os elementos do array devem ser objetos', async () => {
      const result = await productsServices.getAllProducts();

      expect(result[0]).to.be.an('object');
    });

    it('Deve incluir as chaves id e name', async () => {
      const result = await productsServices.getAllProducts();

      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });
});

describe('Busca um produtos no BD pelo ID na camada Services', () => {
  describe('Quando o produto é encontrado', () => {
    before(() => {
      const mockResult = [[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ], []];

      sinon.stub(ProductsModel, 'getByPk').resolves(mockResult);
    });

    after(() => {
      ProductsModel.getByPk.restore();
    });

    it('Retorna um array', async () => {
      const result = await productsServices.getProductsById(1);
      
      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await productsServices.getProductsById(1);

      expect(result).to.not.be.empty;
    });

    it('Os elementos do array devem ser objetos', async () => {
      const [[result]] = await productsServices.getProductsById(1);
      
      expect(result).to.be.an('object');
    });

    it('Deve incluir as chaves id e name', async () => {
      const [[result]] = await productsServices.getProductsById(1);

      expect(result).to.include.all.keys('id', 'name');
    });

  });

  describe('Quando o produto não é encontrado', () => {
    it('Um erro deve ser lançado', async () => {
      const result = productsServices.getProductsById(200);
      expect(result)
        .to.eventually.be.rejectedWith('Product not found')
        .and.be.an.instanceOf(NotFoundError);
    });
  })
});

describe('insere um novo produto no BD na camada Services', () => {
  describe('Quando um produto é inserido com sucesso', () => {
    before(() => {
      const mockResult = [{
        "id": 4,
        "name": "Espada Justiceira"
      }]

      sinon.stub(ProductsModel, 'createProduct').resolves(mockResult);
    });

    after(() => {
      ProductsModel.createProduct.restore();
    });

    it('Retorna um objeto', async () => {
      const [result] = await productsServices.createProduct("Espada Justiceira");

      expect(result).to.be.an('object');
    });

    it('O objeto não deve estar vazio', async () => {
      const [result] = await productsServices.createProduct("Espada Justiceira");

      expect(result).to.not.be.empty;
    });

    it('Deve incluir as chaves id e name', async () => {
      const [result] = await productsServices.createProduct("Espada Justiceira");

      expect(result).to.include.all.keys('id', 'name');
    });
  });
});
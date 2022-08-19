const salesService = require('../services/sales.services');

const salesController = {
  getAllSales: async (req, res) => {
    const allSales = await salesService.getAllSales();

    res.status(200).json(allSales);
  },

  getSaleById: async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);

    return res.status(200).json(sale);
  },

  createSale: async (req, res) => {
    const data = await salesService.createSale(req.body);

    return res.status(201).json(data);
  },
};

module.exports = salesController;

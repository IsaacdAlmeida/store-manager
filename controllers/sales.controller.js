const salesService = require('../services/sales.services');

const salesController = {
  createSale: async (req, res) => {
    const data = await salesService.createSale(req.body);

    return res.status(201).json(data);
  },
};

module.exports = salesController;

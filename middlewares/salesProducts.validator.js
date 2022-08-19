const Joi = require('joi');
const BadRequestError = require('../errors/BadRequestError');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

const salesProductSchema = Joi.array().items(Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '400',
  }),
}));

const salesQuantitySchema = Joi.array().items(Joi.object({
  quantity: Joi.number().min(1).required().messages({
    'any.required': '400',
    'number.min': '422',
  }),
}));

const validateSalesProducts = {
  validateProductId: (req, _res, next) => {
    const { error } = salesProductSchema.validate(req.body);

    if (error) {
      const status = error.message;
      switch (status) {
        case '400':
          throw new BadRequestError('"productId" is required');
        default:
          break;
      }
    }
    next();
  },

  validateQuantity: (req, _res, next) => {
    const { error } = salesQuantitySchema.validate(req.body);

    if (error) {
      const status = error.message;
      switch (status) {
        case '400':
          throw new BadRequestError('"quantity" is required');
        case '422':
          throw new UnprocessableEntityError('"quantity" must be greater than or equal to 1');
        default:
          break;
      }
    }
    next();
  },
};

module.exports = validateSalesProducts;

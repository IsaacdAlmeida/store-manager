const Joi = require('joi');
const BadRequestError = require('../errors/BadRequestError');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

const productNameSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '400',
    'string.min': '422',
  }),
});

const validateProducts = {
  validateName: (req, _res, next) => {
    const { error } = productNameSchema.validate(req.body);

    if (error) {
      const status = error.message;
      switch (status) {
        case '400':
          throw new BadRequestError('"name" is required');
        case '422':
          throw new UnprocessableEntityError('"name" length must be at least 5 characters long');
        default:
          break;
      }
    }
    next();
  },
};

module.exports = validateProducts;
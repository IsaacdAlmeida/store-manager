class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.code = 'badRequest';
  }
}

module.exports = BadRequestError;
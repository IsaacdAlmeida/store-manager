class UnprocessableEntityError extends Error {
  constructor(message) {
    super(message);
    this.status = 422;
    this.code = 'UnprocessableEntity';
  }
}

module.exports = UnprocessableEntityError;
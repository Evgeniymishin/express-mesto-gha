const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR;
  }
}

module.exports = BadRequestError;

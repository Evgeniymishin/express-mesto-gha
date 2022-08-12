const { FORBIDDEN } = require('../utils/constants');

class NoAcessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = NoAcessError;

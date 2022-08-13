// http statuses
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

// security
const SALT_LENGTH = 10;
const SECRET_KEY = 'key';
const TOKEN_LIFETIME = '1d';

// server params
const PORT = 3000;

// RegExp patterns
const REG_EXP_LINK = /^http(s|):\/\/(www.|)((\w+|\d+)(-|\.))+[a-z]{2,3}(\S+|)(#| +|)$/i;

// other
const MONGO_DUPLICATE_CODE = 11000;

module.exports = {
  PORT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  SALT_LENGTH,
  SECRET_KEY,
  TOKEN_LIFETIME,
  REG_EXP_LINK,
  MONGO_DUPLICATE_CODE,
};

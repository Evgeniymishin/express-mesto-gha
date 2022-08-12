const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, TOKEN_LIFETIME } = require('../utils/constants');

const handleAuthError = (res) => {
  res
    .status(UNAUTHORIZED)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_LIFETIME);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};

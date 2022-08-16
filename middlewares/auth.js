const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized');

const handleAuthError = (req, res, next) => next(new UnauthorizedError('Необходима авторизация'));

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};

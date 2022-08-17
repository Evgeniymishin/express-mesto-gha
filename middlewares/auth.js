const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let token = req.cookies.access_token;
  if (token === undefined) {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startWith('Bearer ')) {
      token = authorization.replace('Bearer ', '');
    }
  }
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError(`${token} ${NODE_ENV} ${JWT_SECRET}`);
  }

  req.user = payload;

  return next();
};

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'localhost:3000',
  'https://mesto.study.nomoredomains.sbs',
  'https://api.mesto.study.nomoredomains.sbs',
  'http://mesto.study.nomoredomains.sbs',
  'http://api.mesto.study.nomoredomains.sbs',
];

module.exports = (req, res, next) => {
  const { methodHttp } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  // res.header('Access-Control-Allow-Origin', '*');
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (methodHttp === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

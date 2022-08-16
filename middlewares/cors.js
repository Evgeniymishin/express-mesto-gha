const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'localhost:3000',
  'mesto.study.nomoredomains.sbs',
  'api.mesto.study.nomoredomains.sbs',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  // res.header('Access-Control-Allow-Origin', '*');
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};

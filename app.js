const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { PORT = 3000 } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const cors = require('./middlewares/cors');
require('dotenv').config();

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  const allowedCors = [
    'localhost:3000',
    'https://mesto.study.nomoredomains.sbs',
    'https://api.mesto.study.nomoredomains.sbs',
    'http://mesto.study.nomoredomains.sbs',
    'http://api.mesto.study.nomoredomains.sbs',
  ];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
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
    return res.end();
  }

  return next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);

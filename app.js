const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { PORT = 3000 } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['localhost:3000',
    'https://mesto.study.nomoredomains.sbs',
    'https://api.mesto.study.nomoredomains.sbs',
    'http://mesto.study.nomoredomains.sbs',
    'http://api.mesto.study.nomoredomains.sbs'],
  credentials: true,
}));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/user');
const { NOT_FOUND, PORT = 3000, REG_EXP_LINK } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found');
const routes = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);

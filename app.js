const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/user');
const { NOT_FOUND, INTERNAL_SERVER_ERROR, PORT = 3000 } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, require('./routes/user'));
app.use('/cards', auth, require('./routes/card'));

app.all('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Неправильный путь' });
});
app.use(errors());
app.use((err, req, res) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(err.statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT);

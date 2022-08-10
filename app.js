const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const { NOT_FOUND } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62f17e65a09bfc78c148a749',
  };

  next();
});
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.all('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Неправильный путь' });
});

app.listen(PORT);

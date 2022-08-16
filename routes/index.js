const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const { REG_EXP_LINK } = require('../utils/constants');
const NotFoundError = require('./errors/not-found');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REG_EXP_LINK),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/users', auth, require('./routes/user'));
app.use('/cards', auth, require('./routes/card'));

app.all('*', auth, (req, res) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
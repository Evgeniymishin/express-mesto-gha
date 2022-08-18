const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const { REG_EXP_LINK } = require('../utils/constants');
const NotFoundError = require('../errors/not-found');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REG_EXP_LINK),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('access-token').send({ message: 'Вы вышли из системы' });
});

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/users', auth, require('./user'));
router.use('/cards', auth, require('./card'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;

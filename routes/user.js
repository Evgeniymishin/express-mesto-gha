const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getCurrentUserInfo);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserInfo, updateUser } = require('../controllers/usersController');

router.get('/me', getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;

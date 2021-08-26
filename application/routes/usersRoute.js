const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { emailCheck } = require('../constants');

const { getUserInfo, updateUser } = require('../controllers/usersController');

router.get('/me', getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().pattern(emailCheck),
    name: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlCheck } = require('../constants');

const { getUserInfo, updateUser } = require('../controllers/usersController');

router.get('/me', getUserInfo);
router.patch('/me', updateUser);

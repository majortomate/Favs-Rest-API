/**
 * User API
 */
const express = require('express');

const { Router } = express;

const { registerValidation } = require('./auth.joiSchema');

const {
  loginUserHandler,
  registerUserHandler,
  getAllUsersHandler,
} = require('./auth.controller');

const router = Router();

router.post('/login', loginUserHandler);
router.post('/register', registerValidation, registerUserHandler);
router.get('/', getAllUsersHandler);
module.exports = router;

/**
 * User API
 */
const express = require('express');

const { Router } = express;

const {
  loginUserHandler,
  getAllUsersHandler,
} = require('./auth.controller');

const router = Router();

router.post('/', loginUserHandler);
router.get('/', getAllUsersHandler);
module.exports = router;

/**
 * FAVS API
 */
const express = require('express');

const { Router } = express;

const { isAuthenticated } = require('../../auth/local/auth.service');

const {
  getAllFavshandler,
  getSingleFavsHanlder,
  createFavsHandlder,
  deleteFavsHanlder,
} = require('./favs.controller');

const router = Router();

router.get('/', isAuthenticated, getAllFavshandler);
router.get('/:id', isAuthenticated, getSingleFavsHanlder);
router.post('/', isAuthenticated, createFavsHandlder);
router.delete('/:id', isAuthenticated, deleteFavsHanlder);
module.exports = router;

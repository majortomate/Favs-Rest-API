/**
 * FAVS API
 */
const express = require('express');

const { Router } = express;

const {
  getAllFavshandler,
  getSingleFavsHanlder,
  createFavsHandlder,
  deleteFavsHanlder,
} = require('./favs.controller');

const router = Router();

router.get('/', getAllFavshandler);
router.get('/:id', getSingleFavsHanlder);
router.post('/', createFavsHandlder);
router.delete('/:id', deleteFavsHanlder);
module.exports = router;

const express = require('express');

const { Router } = express;
const { isAuthenticated } = require('../../auth/local/auth.service');

const {
  createFavItemsHandler,
  updateFavItemsHandler,
  deleteFavItemsHandler,
  getAllFavItemsHandler,
  getSingleFavItemsHandler,
} = require('./favItems.controller');

const router = Router();

router.post('/:favId', isAuthenticated, createFavItemsHandler);
router.patch('/:id', isAuthenticated, updateFavItemsHandler);
router.delete('/:id', isAuthenticated, deleteFavItemsHandler);
router.get('/', getAllFavItemsHandler);
router.get('/:id', getSingleFavItemsHandler);

module.exports = router;

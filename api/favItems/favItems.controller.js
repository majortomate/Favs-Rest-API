const {
  getAllFavItems,
  getSingleFavItems,
  createFavItems,
  updateFavItems,
  deleteFavItems,
} = require('./favItems.services');

const {
  addFavItemsToFav,
  deleteFavIteminFavList,
} = require('../favs/favs.service');

const createFavItemsHandler = async (req, res) => {
  const { favId } = req.params;
  const { user } = req;

  const FavItemToCreate = { ...req.body, user, fav: favId };

  try {
    const favItemCreated = await createFavItems(FavItemToCreate);

    await addFavItemsToFav(favId, favItemCreated.id);

    return res.status(201).json(favItemCreated);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateFavItemsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const favItemUpdated = await updateFavItems(id, req.body);
    return res.status(200).json(favItemUpdated);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteFavItemsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const favItemToDelete = await getSingleFavItems(id);
    if (!favItemToDelete) {
      return res.status(404).json({ message: 'FavItem not found' });
    }
    await deleteFavIteminFavList(id, favItemToDelete.fav);
    await deleteFavItems(id);
    return res.json({ message: 'FavItem deleted' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getAllFavItemsHandler = async (req, res) => {
  try {
    const favs = await getAllFavItems();
    return res.status(200).json(favs);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getSingleFavItemsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const favItemFound = await getSingleFavItems(id);
    if (!favItemFound) {
      return res.status(404).json({ message: 'FavItem not found' });
    }
    return res.status(200).json(favItemFound);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAllFavItemsHandler,
  getSingleFavItemsHandler,
  createFavItemsHandler,
  updateFavItemsHandler,
  deleteFavItemsHandler,
};

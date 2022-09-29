const FavItems = require('./favItems.model');

const getAllFavItems = () => FavItems.find({});

const getSingleFavItems = (id) => FavItems.findById(id);

const createFavItems = (favList) => FavItems.create(favList);

const updateFavItems = (id, updateFavList) => FavItems.findByIdAndUpdate(id, updateFavList);

const deleteFavItems = (id) => FavItems.findByIdAndDelete(id);

module.exports = {
  createFavItems,
  updateFavItems,
  deleteFavItems,
  getAllFavItems,
  getSingleFavItems,
};

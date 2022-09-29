const Favs = require('./favs.model');

const getAllFavs = () => Favs.find({});

const getSingleFav = (id) => Favs.findById(id).populate('favItems');

const createFav = (data) => Favs.create(data);

const deleteFav = (id) => Favs.findByIdAndDelete(id);

const addFavItemsToFav = (id, favId) => Favs.findByIdAndUpdate(
  id,
  { $push: { favItems: favId } },
  { new: true },
);

const deleteFavIteminFavList = (favId, id) => Favs.findByIdAndUpdate(
  id,
  { $pull: { favItems: favId } },
  { multi: true },
);

module.exports = {
  addFavItemsToFav,
  deleteFavIteminFavList,
  getAllFavs,
  getSingleFav,
  createFav,
  deleteFav,
};

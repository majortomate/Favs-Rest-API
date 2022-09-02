const Fav = require('./favs.model');
const User = require('../../auth/local/auth.model');

const getAllFavshandler = async (req, res) => {
  const favs = await Fav.find({});

  if (!favs) {
    res.status(404).json({ failed: 'no favs found' });
  }
  res.status(200).json({ found: favs });
};

const getSingleFavsHanlder = async (req, res) => {
  const { id } = req.params;

  try {
    const singleFav = await Fav.findById(id);

    if (singleFav) {
      return res.status(200).json({ found: singleFav });
    }
    return res.status(404).json({ error: 'fav doesnt exist' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createFavsHandlder = async (req, res) => {
  const favsData = req.body;
  const id = '631249ea701467900ea7433e';
  const user = await User.findById(id).populate('favs');

  // Check if user exists
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }

  // Check if list name exists
  const userFavs = user.favs.map((fav) => fav.name)
    .includes(favsData.name);

  if (userFavs) {
    return res.status(400).json({ duplicate: "you can't create a list with the same name" });
  }

  try {
    const favsCreated = await Fav.create(favsData);
    await User.findByIdAndUpdate(user, {
      $push: { favs: favsCreated },
    });

    if (favsCreated) {
      return res.status(200).json({ created: favsCreated });
    }
    return res.status(500).json({ error: 'couldnt create favs' });
  } catch (error) {
    return console.log(error);
  }
};

const deleteFavsHanlder = async (req, res) => {
  const { id } = req.params;

  try {
    const FavToDelete = await Fav.findByIdAndRemove(id);

    if (FavToDelete) {
      return res.status(200).json({ deleted: FavToDelete });
    }
    return res.status(404).json({ error: 'Fav not found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAllFavshandler,
  getSingleFavsHanlder,
  createFavsHandlder,
  deleteFavsHanlder,
};

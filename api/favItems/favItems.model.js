const mongoose = require('mongoose');

const FavItemsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    link: String,
    fav: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favs',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const FavItems = mongoose.model('FavItems', FavItemsSchema);

module.exports = FavItems;

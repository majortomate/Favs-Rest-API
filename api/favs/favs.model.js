const mongoose = require('mongoose');

const FavListSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  favItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FavItems',
    },
  ],
}, { timestamps: true, versionKey: false });

const Favs = mongoose.model('Favs', FavListSchema);

module.exports = Favs;

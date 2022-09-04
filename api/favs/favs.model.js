const mongoose = require('mongoose');

const FavItemSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
}, { timestamps: true });

const FavListSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  favItem: [FavItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
}, { timestamps: true });

const Favs = mongoose.model('Favs', FavListSchema);

module.exports = Favs;

const mongoose = require('mongoose');

const FavsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
}, { timestamps: true });

const Favs = mongoose.model('Favs', FavsSchema);

module.exports = Favs;

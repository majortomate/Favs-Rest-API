/* eslint-disable no-underscore-dangle */
const User = require('./auth.model');
const { signToken } = require('./auth.service');

const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ failed: 'All fields are required' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'Wrong credentials' });
  }

  if (user.password !== password) {
    return res.status(404).json({ message: 'Wrong password' });
  }
  const token = signToken({ email: user.email });

  return res.status(200).json({ success: 'Youre now logged in', token });
};

const getAllUsersHandler = async (req, res) => {
  const users = await User.find({}).populate('favs');

  if (!users) {
    res.status(404).json('error');
  }
  res.status(200).json(users);
};

module.exports = {
  loginUserHandler,
  getAllUsersHandler,
};

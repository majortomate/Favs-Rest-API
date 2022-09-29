/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const {
  signToken, getAllUsers, createUser, getSingleUserByQuery,
} = require('./auth.service');

const registerUserHandler = async (req, res) => {
  const userData = req.body;
  const { email, password } = req.body;
  const userFound = await getSingleUserByQuery({ email });

  if (userFound) {
    return res.status(404).json({ message: 'User already registered' });
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  userData.password = hash;

  try {
    const usertoCreate = await createUser(userData);

    return res.status(201).json(usertoCreate);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ failed: 'All fields are required' });
  }

  const user = await getSingleUserByQuery({ email });

  if (!user) {
    return res.status(404).json({ message: 'Wrong credentials' });
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(404).json({ message: 'Wrong password' });
  }
  const token = signToken({ email: user.email });

  return res.status(200).json({ success: 'Youre now logged in', token });
};

const getAllUsersHandler = async (req, res) => {
  const users = await getAllUsers();

  if (!users) {
    res.status(404).json('error');
  }
  res.status(200).json(users);
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  getAllUsersHandler,
};

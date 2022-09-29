const jwt = require('jsonwebtoken');

const User = require('./auth.model');

const createUser = (user) => User.create(user);
const getSingleUser = (id) => User.findById(id).populate('favs');
const getSingleUserByQuery = (query) => User.findOne(query).populate('favs');
const getAllUsers = () => User.find({}).populate('favs');

const signToken = (payload) => {
  const token = jwt.sign(
    payload,
    process.env.TOKEN,
    { expiresIn: '1h' },
  );
  return token;
};

const verifyToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.TOKEN);
    return payload;
  } catch (error) {
    return null;
  }
};

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = authHeader.split(' ')[1];

  // validate token
  const decoded = await verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // add user to request
  const { email } = decoded;
  const user = await User.findOne({ email }).populate('favs');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.user = user;

  next();
  return true;
};
module.exports = {
  isAuthenticated,
  signToken,
  verifyToken,
  createUser,
  getSingleUser,
  getSingleUserByQuery,
  getAllUsers,
};

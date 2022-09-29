/* Main application routes */

const favs = require('./api/favs/index');
const favItems = require('./api/favItems/index');
const { isAuthenticated } = require('./auth/local/auth.service');
const auth = require('./auth/local/index');

const routes = (app) => {
  app.use('/api/favs', isAuthenticated, favs);
  app.use('/api/favItems/', isAuthenticated, favItems);
  app.use('/auth/local/', auth);
};

module.exports = routes;

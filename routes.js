/* Main application routes */

const favs = require('./api/favs/index');
const auth = require('./auth/local/index');

const routes = (app) => {
  app.use('/api/favs', favs);
  app.use('/auth/local/login', auth);
};

module.exports = routes;

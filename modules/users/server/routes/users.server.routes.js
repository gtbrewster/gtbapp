'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  app.route('/api/auth/signin').post(users.signin);
  app.route('/logout').post(users.signout);

  app.route('/api/user')
    .get(users.list);

  app.route('/api/user/:userId')
    .get(users.read)
    .put(users.update);

  app.param('userId', users.userById);
};

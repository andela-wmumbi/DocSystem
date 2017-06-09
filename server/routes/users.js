const users = require('./../controllers/users');

module.exports = (app) => {
  app.route('/users')
    .post(users.create)
    .get(users.list);
  app.route('/users/:userId')
    .get(users.findOne)
    .put(users.update)
    .delete(users.destroy);
};

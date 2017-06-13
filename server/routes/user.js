const user = require('./../controllers/user');

module.exports = (app) => {
  app.route('/users')
    .post(user.create)
    .get(user.list);
  app.route('/users/:userId')
    .get(user.findOne)
    .put(user.update)
    .delete(user.destroy);
  app.route('/login')
    .post(user.login);
};

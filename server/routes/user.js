const user = require('./../controllers/user');
const authorization = require('./middlewares/authorization');

module.exports = (app) => {
  // app.use(authorization.authenticate);
  const auth = authorization.authenticate;
  app.route('/users')
    .post(user.create)
    .get(user.list);
  app.route('/users/:userId')
    .get(user.findOne)
    .put(user.update)
    .delete(user.destroy);
  app.route('/signin')
    .post(user.login);
  app.route('/logout')
    .post(user.logout);
};

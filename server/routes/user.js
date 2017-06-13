const user = require('./../controllers/user');
const authorization = require('./middlewares/authorization');

module.exports = (app) => {
  // app.use(authorization.authenticate);
  const auth = authorization.authenticate;
  app.route('/users')
    .post(user.create)
    .get(auth, user.list);
  app.route('/users/:userId')
    .get(auth, user.findOne)
    .put(auth, user.update)
    .delete(auth, user.destroy);
  app.route('/login')
    .post(user.login);
  app.route('/logout')
    .post(user.logout);
};

const user = require('./../controllers/user');
const authorization = require('./middlewares/authorization');

module.exports = (app) => {
  // app.use(authorization.authenticate);
  const auth = authorization.authenticate;
  app.route('/api/users')
    .post(user.create)
    .get(user.list);
  app.route('/api/users/:userId')
    .get(user.findOne)
    .put(user.update)
    .delete(user.destroy);
  app.route('/api/signin')
    .post(user.login);
  app.route('/api/logout')
    .post(user.logout);
};

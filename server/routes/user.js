const user = require('./../controllers/user');
const authorization = require('./middlewares/authorization');

module.exports = (app) => {
  const auth = authorization.authenticate;
  const authAdmin = authorization.verifyAdmin;

  app.route('/api/users')
    .post(user.create)
    .get(auth, user.list);
  app.route('/api/users/:userId')
    .get(auth, user.findOne)
    .put(auth, user.update)
    .delete(auth, authAdmin, user.destroy);
  app.route('/api/signin')
    .post(user.login);
  app.route('/api/logout')
    .post(user.logout);
  app.route('/users/:userId/documents')
    .get(auth, user.findUserDocuments);
  app.route('/search/users/:user')
    .get(auth, user.findUser);
};

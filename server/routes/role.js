const role = require('./../controllers/role');
const authorization = require('./middlewares/authorization');

const auth = authorization.authenticate;

module.exports = (app) => {
  app.route('/api/roles')
    .post(auth, role.create)
    .get(auth, role.list);
  app.route('/api/roles/:roleId')
    .delete(auth, role.destroy);
};

const role = require('./../controllers/role');

module.exports = (app) => {
  app.route('/api/roles')
    .post(role.create)
    .get(role.list);
  app.route('/api/roles/:roleId')
    .get(role.findOne)
    .delete(role.destroy);
};

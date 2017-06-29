const role = require('./../controllers/role');

module.exports = (app) => {
  app.route('/api/roles')
    .post(role.create)
    .get(role.list);
};

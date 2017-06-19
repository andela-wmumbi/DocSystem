const role = require('./../controllers/role');
const authorization = require('./middlewares/authorization');

module.exports = (app) => {

  app.route('/roles')
    .post(role.create)
    .get(role.list);
}

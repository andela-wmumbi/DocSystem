const document = require('./../controllers/document');
const authorization = require('./middlewares/authorization');

module.exports = (app) => {
  const auth = authorization.authenticate;
  app.route('/api/documents')
    .post(auth, document.create)
    .get(document.list);
  app.route('/api/documents/:docId')
    .get(auth, document.findOne)
    .put(auth, document.update)
    .delete(document.destroy);
};

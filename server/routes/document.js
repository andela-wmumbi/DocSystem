const document = require('./../controllers/document');
const authorization = require('./middlewares/authorization');

module.exports = (app) => {
  const auth = authorization.authenticate;
  const authAdmin = authorization.verifyAdmin;
  app.route('/api/documents')
    .post(auth, document.create)
    .get(document.list);
  app.route('/api/documents/:docId')
    .get(auth, document.findOne)
    .put(auth, document.update)
    .delete(auth, authAdmin, document.destroy);
  app.route('/search/documents/:document')
    .get(document.findDocument);
  app.route('/api/documents/?limit={integer}&offset={integer}')
    .get(document.list);
};

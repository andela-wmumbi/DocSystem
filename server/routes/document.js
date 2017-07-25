const document = require('./../controllers/document');
const authorization = require('./middlewares/authorization');

module.exports = (app) => {
  const auth = authorization.authenticate;
  app.route('/api/documents')
    .post(auth, document.create)
    .get(auth, document.list);
  app.route('/api/documents/:docId')
    .get(auth, document.findOne)
    .put(auth, document.update)
    .delete(auth, document.destroy);
  app.route('/search/documents')
    .get(document.findDocument);
  app.route('/api/documents?limit={integer}&offset={integer}')
    .get(document.list);
  app.route('/api/roleDocuments/')
    .get(document.roleDocuments);
};

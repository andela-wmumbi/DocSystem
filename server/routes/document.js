const document = require('./../controllers/document');

module.exports = (app) => {
  app.route('/api/documents')
    .post(document.create)
    .get(document.list);
  app.route('/api/documents/:docId')
    .get(document.findOne)
    .put(document.update)
    .delete(document.destroy);
};

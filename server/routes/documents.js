const documents = require('./../controllers/documents');

module.exports = (app) => {
  app.route('/documents')
    .post(documents.create)
    .get(documents.list);
  app.route('/documents/:docId')
    .get(documents.findOne)
    .put(documents.update)
    .delete(documents.destroy);
};

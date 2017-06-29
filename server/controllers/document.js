const document = require('./../models').document;

class DocumentController {
  create(req, res) {
    return document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.decoded.id,
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  }
  list(req, res) {
    if (req.query.limit || req.query.offset) {
      return document
        .findAll({
          limit: req.query.limit,
          offset: req.query.offset
        })
        .then((document) => {
          if (!document) {
            return res.status(404).send({
              message: 'Document not found'
            });
          }
          res.status(200).send(document);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    }
    return document
      .findAll({ where: { access: 'public' } })
      .then(document => res.status(200).send(document))
      .catch(error => res.status(404).send(error));
  }

  findOne(req, res) {
    return document
      .findById(req.params.docId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found',
          });
        }
        return res.status(200).send(document);
      });
  }
  update(req, res) {
    return document
      .findById(req.params.docId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found'
          });
        }
        return document
          .update({
            title: req.body.title || document.title,
            content: req.body.content || document.content
          })
          .then((doc) => res.status(200).send(doc))
          .catch(error => res.status(400).send(error));
      });
  }
  destroy(req, res) {
    return document
      .findById(req.params.docId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send({ message: 'Document deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      });
  }
  findDocument(req, res) {
    if (req.params.document) {
      return document
        .findAll(
        {
          where:
          {
            title: {
              $like: `%${req.params.document}%`
            }
          }
        })
        .then((documents) => {
          if (!documents.length) return res.status(404).send({ message: 'Document not found.' });
          return res.status(200).send(documents);
        });
    }
  }
}
module.exports = new DocumentController();

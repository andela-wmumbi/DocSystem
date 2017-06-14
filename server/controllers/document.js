const document = require('../models').document;
const user = require('../models').user;

class DocumentController {
  create(req, res) {
    return document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.header.token
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  }
  list(req, res) {
    return user
      .findAll({
        include: [{
          model: 'docId',
          as: 'document'
        }],
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
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
      })
      .catch(error => res.status(400).send(error));
  }
  update(req, res) {
    return document
      .findById(req.params.docId)
      .then((document) => {
        if (!document) {
          return res.status(400).send({
            message: 'Document not found'
          });
        }
        return document
          .update({
            title: req.body.title || document.title
          })
          .then(() => res.status(200).send(document))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  destroy(req, res) {
    return document
      .findById(req.params.docId)
      .then((document) => {
        if (!document) {
          return res.status(400).send({
            message: 'Document not found'
          });
        }
        return document
          .destroy()
          .then(() => res.status(204).send({ message: 'Document deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}
module.exports = new DocumentController();

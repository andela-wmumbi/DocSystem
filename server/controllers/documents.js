const documents = require('../models').Documents;
const users = require('../models').Users;

class DocController {
  create(req, res) {
    return documents
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.body.userId
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  }
  list(req, res) {
    return users
      .findAll({
        include: [{
          model: 'docId',
          as: 'documents'
        }],
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  }
  findOne(req, res) {
    return documents
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
    return documents
      .findById(req.params.docId)
      .then((document) => {
        if (!document) {
          return res.status(400).send({
            message: 'Document not found'
          });
        }
        return documents
          .update({
            title: res.body.title || documents.title
          })
          .then(() => res.status(200).send(document))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  destroy(req, res) {
    return documents
      .findById(req.params.docId)
      .then((document) => {
        if (!document) {
          return res.status(400).send({
            message: 'Document not found'
          });
        }
        return documents
          .destroy()
          .then(() => res.status(204).send({ message: 'Document deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}
module.exports = new DocController();

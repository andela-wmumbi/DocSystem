const users = require('../models').Users;
const documents = require('./../models/documents').Documents;

class userController {
  create(req, res) {
    return users
      .create({
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  }
  list(req, res) {
    return users
      .findAll()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  }
  findOne(req, res) {
    return users
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found',
          });
        }
        return res.status(200).send(user)
      })
      .catch(error => res.status(400).send(error));
  }
  update(req, res) {
    return users
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User not found'
          });
        }
        return users
          .update({
            email: res.body.email || users.email
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  destroy(req, res) {
    return users
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User not found'
          });
        }
        return users
          .destroy()
          .then(() => res.status(204).send({ message: 'Todo deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}
module.exports = new userController();

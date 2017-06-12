const users = require('../models').Users;
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET;

const jwt = require('jsonwebtoken');

class userController {
  create(req, res) {
    return users
      .create({
        userName: req.body.userName,
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
          .then(() => res.status(204).send({ message: 'User deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  login(req, res) {
    return users
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        const password = bcrypt.compareSync(res.body.password, user.password);
        if (!password) {
          return 'Wrong password';
        }
        const token = jwt.sign({ email: user.email }, secretKey, {
          expiresIn: 60 * 60
        });
        user.password = null;
        res.status(200).json(Object.assign({},
          { id: user.id, userName: user.userName, email: user.email }, { token }));
      });
  }
}
module.exports = new userController();

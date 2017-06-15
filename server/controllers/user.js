const user = require('../models').user;
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET;

const jwt = require('jsonwebtoken');

class userController {
  create(req, res) {
    return user
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then((user) => {
        res.status(201).send(user);
      })
      .catch(error => res.status(400).send(error));
  }
  list(req, res) {
    return user
      .findAll()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(404).send(error));
  }
  findOne(req, res) {
    return user
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found',
          });
        }
        return res.status(200).send(user);
      });
  }
  update(req, res) {
    return user
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User not found'
          });
        }
        return user
          .update({
            email: req.body.email || user.email,
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  destroy(req, res) {
    return user
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User not found'
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send({ message: 'User deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  login(req, res) {
    return user
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        const password = bcrypt.compareSync(req.body.password, user.password);
        if (req.body.password !== user.password) {
          return res.status(401).json({ message: 'Wrong password' });
        }
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: 60 * 60
        });
        user.password = null;
        res.status(200).json(Object.assign({},
          { id: user.id, username: user.username, email: user.email }, { token }));
      });
  }
  logout(req, res) {
    req.decoded = null;
    return res.status(200).send({
      message: 'successfully logged out',
    });
  }
}
module.exports = new userController();

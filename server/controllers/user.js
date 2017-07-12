const user = require('./../models').user;
const document = require('./../models').document;
const role = require('./../models').role;

const secretKey = process.env.SECRET;

const jwt = require('jsonwebtoken');

class userController {
  create(req, res) {
    const { username, email, password, roleTitle } = req.body;
    return user
      .create({
        username,
        email,
        password,
        roleTitle
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.json(error));
  }
  list(req, res) {
    if (req.query.limit || req.query.offset) {
      return user
        .findAll({
          limit: req.query.limit,
          offset: req.query.offset,
        })
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'Users not found'
            });
          }
          res.status(200).send(user);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    }
    return user
      .findAll()
      .then(users => res.status(200).send(users))
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

  findUserDocuments(req, res) {
    return user
      .findById(req.params.userId, {
        include: [{
          model: document,
          as: 'document'
        }]
      })
      .then(users => res.status(200).send(users.document))
      .catch(error => res.status(404).send(error));
  }

  update(req, res) {
    return user
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        return user
          .update({
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            roleTitle: req.body.roleTitle || user.roleTitle
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      });
  }
  destroy(req, res) {
    return user
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      });
  }
  login(req, res) {
    return user
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // const password = bcrypt.compareSync(req.body.password, user.password);
        if (req.body.password !== user.password) {
          return res.status(401).json({ message: 'Wrong password' });
        }
        const token = jwt.sign({
          id: user.id,
          roleTitle: user.roleTitle,
          username: user.username,
          createdAt: user.createdAt,
          email: user.email,
        }, secretKey, {
            expiresIn: 60 * 60 * 60
          });
        user.password = null;
        res.status(200).json(Object.assign({},
          { id: user.id, username: user.username, email: user.email, roleTitle: user.roleTitle }, { token }));
      });
  }
  logout(req, res) {
    req.decoded = null;
    sessionStorage.removeItem('token');
    return res.status(200).send({
      message: 'User successfully logged out',
    });
  }
  findUser(req, res) {
    if (req.params.user) {
      return user
        .findAll(
        {
          where:
          {
            username: {
              $like: `%${req.params.user}%`
            }
          },
          include: [{
            model: document,
            as: 'document'
          }]
        })
        .then((users) => {
          if (!users.length) return res.status(404).send({ message: 'User not found.' });
          return res.status(200).send(users);
        });
    }
  }
}
module.exports = new userController();

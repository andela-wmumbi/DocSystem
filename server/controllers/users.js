const users = require('../models').Users;

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
      .find((err, users) => {
        if (err)
          res.send(err);
        res.json(users);
      });
  }
}
module.exports = new userController();

const role = require('../models').role;

class roleController {
  create(req, res) {
    return role
      .create({
        title: req.body.title
      })
      .then((role) => {
        return res.status(201).send({ role });
      })
      .catch(error => res.status(400).send(error));
  }
  list(req, res) {
    return role
      .findAll()
      .then(role => res.status(200).send(role))
      .catch(error => res.status(404).send(error));
  }
}
module.exports = new roleController();

const role = require('../models').role;

class roleController {
  create(req, res) {
    return role
      .create({
        title: req.body.title
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  }
  findOne(req, res) {
    return role
    .findById(req.params.roleId)
    .then(role => res.status(200).send(role))
    .catch(error => res.status(404).send(error));
  }
  list(req, res) {
    return role
      .findAll({})
      .then(role => res.status(200).send(role))
      .catch(error => res.status(404).send(error));
  }
  destroy(req, res) {
    return role
      .findById(req.params.roleId)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role not found'
          });
        }
        return role
          .destroy()
          .then(() => res.status(200).send({ message: 'Role deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      });
  }
}
module.exports = new roleController();

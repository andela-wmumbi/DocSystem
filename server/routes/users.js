const users = require('./../controllers/users');

module.exports = (app) => {
  app.route('/users')
    .post(users.create);

  // .get(users.list)
  // app.route('/users/')
  //   .get(user.find) // finds all instances of a user
  //   .post(user.create); // creates a new user
  // app.route('/users/<id>')
  //   .get(user.findUser) // finds a user
  //   .put(user.update) // updates user attributes
  //   .delete(user.delete); // deletes a user
  // app.route(' users/?limit={integer}&offset={integer}')
  //   .get(user.paginate); // pagination of user
};

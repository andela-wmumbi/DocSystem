module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users', [
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'password',
      roleTitle: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};

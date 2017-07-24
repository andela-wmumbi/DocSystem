module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('roles', [
      { title: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { title: 'owner', createdAt: new Date(), updatedAt: new Date() }
  ]),
  down: queryInterface => queryInterface.bulkDelete('roles', null, {})
};

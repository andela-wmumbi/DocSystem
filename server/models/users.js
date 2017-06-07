module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
      classMethods: {
        associate(models) {
          Users.hasMany(models.Users, {
            foreignKey: 'userId',
            as: 'documents',
          });
        }
      }
    });
  return users;
};

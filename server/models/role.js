module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    title: {
      type: DataTypes.STRING,
      isUnique: true
    },
  },
    {
      classMethods: {
        associate: (models) => {
          role.hasMany(models.user, {
            foreignKey: 'roleTitle',
            as: 'user'
          });
        }
      }
    });
  return role;
};

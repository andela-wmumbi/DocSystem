module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    userName: {
      type: DataTypes.STRING,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      required: true
    }
  },
    {
      classMethods: {
        associate(models) {
          user.hasMany(models.Documents, {
            foreignKey: 'userId',
            as: 'documents',
          });
        }
      }
    });
  return user;
};

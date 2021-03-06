const Sequelize = require('sequelize');
const hash = require('object-hash');

require('sequelize-isunique-validator')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [0, 50],
          msg: 'The name is too long'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
    {
      classMethods: {
        associate(models) {
          user.belongsTo(models.role, {
            foreignKey: 'roleTitle',
            onDelete: 'CASCADE',
          });
          user.hasMany(models.document, {
            foreignKey: 'userId',
            as: 'document',
          });
        }
      },
      beforeSave: (instance) => {
        if (instance.isModified('password')) {
          return hash(instance.password).then((hashedPassword) => {
            instance.password = hashedPassword;
          });
        }
      }

    });
  return user;
};

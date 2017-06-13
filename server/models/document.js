module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    title: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: {
          args: [0, 100],
          msg: 'The title is too long'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      required: true,
      validate: {
        len: {
          args: [0, 300],
          msg: 'The content is too long'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      required: true,
      default: 'public',
      enum: ['private', 'public']
    }
  },
    {
      classMethods: {
        associate: (models) => {
          document.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
          });
        },
      },
    });
  return document;
};

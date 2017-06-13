module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    title: {
      type: DataTypes.STRING,
      required: true
    },
    content: {
      type: DataTypes.TEXT,
      required: true
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

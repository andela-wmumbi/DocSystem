module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      required: true
    },
    content: {
      type: DataTypes.STRING,
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
          Documents.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
          });
        },
      },
    });
  return Documents;
};

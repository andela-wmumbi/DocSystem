module.exports = function (sequelize, DataTypes) {
  const Documents = sequelize.define('Documents', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    access: DataTypes.STRING
  }, {
      classMethods: {
        associate(models) {
          Documents.belongTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
          });
        }
      }
    });
  return Documents;
};

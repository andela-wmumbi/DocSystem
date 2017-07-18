module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    title: DataTypes.STRING,
    unique: true
  });
  return role;
};

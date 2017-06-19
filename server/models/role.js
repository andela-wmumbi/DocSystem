'use strict';
module.exports = function (sequelize, DataTypes) {
  var role = sequelize.define('role', {
    title: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          role.hasMany(models.user, {
            foreignKey: 'roleId'
          })
        }
      }
    });
  return role;
};

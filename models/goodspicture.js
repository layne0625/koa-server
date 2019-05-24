'use strict';
module.exports = (sequelize, DataTypes) => {
  const GoodsPicture = sequelize.define('GoodsPicture', {
    url: DataTypes.STRING
  }, {});
  GoodsPicture.associate = function(models) {
    // associations can be defined here
  };
  return GoodsPicture;
};
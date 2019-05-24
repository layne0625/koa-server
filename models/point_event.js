'use strict';
module.exports = (sequelize, DataTypes) => {
  const PointEvent = sequelize.define('PointEvent', {
    point: DataTypes.INTEGER,
    type: DataTypes.INTEGER, 
  }, {});
  PointEvent.associate = function(models) {
    // associations can be defined here
    PointEvent.belongsTo(models.User)
  };
  return PointEvent;
};
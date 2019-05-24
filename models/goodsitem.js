'use strict';
module.exports = (sequelize, DataTypes) => {
  const GoodsItem = sequelize.define('GoodsItem', {
    name: DataTypes.STRING,
    content: DataTypes.TXET,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originPrice: DataTypes.INTEGER,
  }, {});
  GoodsItem.associate = function (models) {
    GoodsItem.hasMany(models.GoodsPicture, {
      as: 'Pictures'
    })
    GoodsItem.belongsTo(models.Activity)
    GoodsItem.belongsTo(models.Category)
    // associations can be defined here
  };
  return GoodsItem;
};
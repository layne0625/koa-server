'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
  }, {});
  Category.associate = function(models) {
    Category.belongsTo(models.Category, { foreignKey: 'parentId' })
    // associations can be defined here
  };
  return Category;
};
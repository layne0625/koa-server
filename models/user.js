'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    wechatId: DataTypes.STRING,
    points: DataTypes.INTEGER,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasOne(User, { as: 'Inviter', foreignKey: 'inviter' })
  };
  return User;
};
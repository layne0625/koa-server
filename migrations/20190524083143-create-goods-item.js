'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('goods_item', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        initialAutoIncrement: 100000
      },
      name: {
        type: Sequelize.STRING
      },
      
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      originPrice: {
        type: Sequelize.INTEGER
      },
      activityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'activities',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'category',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('goods_item');
  }
};
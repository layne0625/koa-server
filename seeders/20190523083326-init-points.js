'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date()
    return queryInterface.bulkInsert('point_events', [{
      point: 100,
      type: 0,
      userId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      point: 100,
      type: 0,
      userId: 1,
      createdAt: now,
      updatedAt: now
    }, {
      point: 100,
      type: 1,
      userId: 1,
      createdAt: now,
      updatedAt: now
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
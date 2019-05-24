'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date()
    return queryInterface.bulkInsert('users', [{
      username: 'John Doe',
      points: 0,
      createdAt: now,
      updatedAt: now
    }, {
      username: 'John Doe1',
      points: 0,
      createdAt: now,
      updatedAt: now
    },{
      username: 'John Doe2',
      points: 0,
      inviter: 1,
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

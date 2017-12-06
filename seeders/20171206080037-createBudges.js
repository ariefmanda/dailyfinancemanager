'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Budgets', [{
      month: 12,
      year: 2017,
      amount: 1000000,
      userId: 1,
      expense: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      month: 1,
      year: 2018,
      amount: 2000000,
      userId:1,
      expense: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Budgets', null, {});
  }
};

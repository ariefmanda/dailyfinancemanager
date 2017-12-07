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
    return queryInterface.bulkInsert('BudgetCategories', [{
      budgetId: 1, //   <----- user x pada bulan x
      categoryId: 1,
      amount : 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      budgetId: 1,
      categoryId: 2,
      amount : 300000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      budgetId: 1,
      categoryId: 3,
      amount : 600000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      budgetId: 2, 
      categoryId: 1,
      amount : 1000000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      budgetId: 2,
      categoryId: 2,
      amount : 1000000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      budgetId: 3,
      categoryId: 7,
      amount : 1500000,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

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
    return queryInterface.bulkInsert('Transactions', [{
      name        : "Makan Siang",
      price       : 0,
      userId      : 1,
      categoryId  : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name        : "Makan malam",
      price       : 0,
      userId      : 1,
      categoryId  : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name        : "Parkir",
      price       : 0,
      userId      : 1,
      categoryId  : 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name        : "Beli Bensin",
      price       : 0,
      userId      : 2,
      categoryId  : 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name        : "Minum Kopi",
      price       : 0,
      userId      : 2,
      categoryId  : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name        : "Parkir PIM",
      price       : 0,
      userId      : 2,
      categoryId  : 4,
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
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};

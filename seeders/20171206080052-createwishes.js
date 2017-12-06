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
    return queryInterface.bulkInsert('Wishes', [{
      name: 'Speaker Active',
      fullfilled: false,
      userId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Sepada hill',
      fullfilled: false,
      userId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Makan malam skybar',
      fullfilled: true,
      userId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'laptop Mac',
      fullfilled: false,
      userId:2,
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
    return queryInterface.bulkDelete('Wishes', null, {});
  }
};

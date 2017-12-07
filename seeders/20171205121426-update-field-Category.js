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
    return queryInterface.bulkInsert('Categories', [{
      name: 'Bahan Bakar',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Makanan',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Minuman',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Piknik',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Hedon',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kursus',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Eat',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Drink',
      userId: 2,
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
    return queryInterface.bulkDelete('Categories', null, {});
  }
};

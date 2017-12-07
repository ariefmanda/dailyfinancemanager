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
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Makanan',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Minuman',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Piknik',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Hedon',
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

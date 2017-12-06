'use strict';
const models = require('../models')
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
    let users = [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        hash: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arief',
        email: 'arief@xxx.com',
        hash: '12345',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return Promise.all(users.map(user => {
      return models.User.create(user)
    }))
    
    
    // queryInterface.bulkInsert('Users', [{
    //   name: 'John Doe',
    //   email: 'john@doe.com',
    //   hash: '1234',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};

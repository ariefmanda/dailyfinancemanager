'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  });
  return Transaction;
};
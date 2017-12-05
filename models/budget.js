'use strict';
module.exports = (sequelize, DataTypes) => {
  var Budget = sequelize.define('Budget', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
  });
  return Budget;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wish = sequelize.define('Wish', {
    name: DataTypes.STRING,
    fullfilled: DataTypes.BOOLEAN
  });
  return Wish;
};
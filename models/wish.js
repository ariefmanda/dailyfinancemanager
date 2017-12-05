'use strict';
module.exports = (sequelize, DataTypes) => {
  var wisht = sequelize.define('Wish', {
    name: DataTypes.STRING,
    fullfilled: DataTypes.BOOLEAN
  });
  return wisht;
};
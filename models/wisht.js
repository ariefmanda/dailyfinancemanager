'use strict';
module.exports = (sequelize, DataTypes) => {
  var wisht = sequelize.define('Wisht', {
    name: DataTypes.STRING,
    fullfilled: DataTypes.BOOLEAN
  });
  return wisht;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wish = sequelize.define('Wish', {
    name: DataTypes.STRING,
    fullfilled: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  });
  Wish.associate= function(models){
    Wish.belongsTo(models.User,{foreignKey:'userId',targetKey: 'id'})
  }
  return Wish;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    name        : DataTypes.STRING,
    price       : DataTypes.INTEGER,
    userId      : DataTypes.INTEGER,
    categoryId  : DataTypes.INTEGER,
  });
  Transaction.associate=function(models){
    Transaction.belongsTo(models.User,{foreignKey:'userId',targetKey: 'id'})
    Transaction.belongsTo(models.Category,{foreignKey:'categoryId',targetKey: 'id'})
  }
  return Transaction;
};
'use strict';
const MonthHelper = require('../helpers/monthHelper')
module.exports = (sequelize, DataTypes) => {
  var Budget = sequelize.define('Budget', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    amount: DataTypes.BIGINT,
    userId: DataTypes.INTEGER,
    expense: DataTypes.BIGINT
  });
  // Budget.afterValidate(budget =>{
  //   budget.amount = Number(budget.amount)
  // })
  Budget.prototype.nameMonth=function(month) {
    return MonthHelper.ConvertMonth(month)
  }
  Budget.associate = function(models) {
    Budget.belongsTo(models.User,{foreignKey:'userId', sourceKey: 'id'})
  }
  return Budget;
};
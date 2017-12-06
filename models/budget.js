'use strict';
const MonthHelper = require('../helpers/monthHelper')
module.exports = (sequelize, DataTypes) => {
  var Budget = sequelize.define('Budget', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    amount: DataTypes.BIGINT,
  });
  Budget.prototype.nameMonth=function(month) {
    return MonthHelper.ConvertMonth(month)
  }
  return Budget;
};
'use strict';
const MonthHelper = require('../helpers/monthHelper')
module.exports = (sequelize, DataTypes) => {
  var Budget = sequelize.define('Budget', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
  });
  Budget.prototype.nameMonth=function() {
    return MonthHelper.ConvertMonth(this.month)
  }
  return Budget;
};
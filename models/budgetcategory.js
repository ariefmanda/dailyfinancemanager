'use strict';
module.exports = (sequelize, DataTypes) => {
  var BudgetCategory = sequelize.define('BudgetCategory', {
    budgetId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    amount: DataTypes.BIGINT
  });

  BudgetCategory.associate = function(models) {
    models.Budget.belongsToMany(models.Category, {
      through : BudgetCategory,
      foreignKey : 'budgetId'
    })
    models.Category.belongsToMany(models.Budget, {
      through : BudgetCategory,
      foreignKey : 'categoryId'
    })
  }
  return BudgetCategory;
};
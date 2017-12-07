'use strict'
const MonthHelper = require('../helpers/monthHelper')
module.exports = (sequelize, DataTypes) => {
  var Budget = sequelize.define('Budget', {
    month: {
      type: DataTypes.INTEGER,
      validate: {
        checkMonth: function(value, next) {
          console.log('------------->', value)
          Budget
            .find({
              where: {
                month: value,
                year: this.year,
                id: { [sequelize.Op.ne]: this.id }
              }
            })
            .then(function(result) {
              if (result === null) {
                return next()
              } else {
                return next(' Month & Year already used')
              }
            })
            .catch(err => {
              return next()
            })
        }
      }
    },
    year: DataTypes.INTEGER,
    monthYear: {
      type: DataTypes.VIRTUAL,
      get: function() {
        let a = [this.getDataValue('month'), this.getDataValue('year')]
        return a
      }
    },
    amount: DataTypes.BIGINT,
    userId: DataTypes.INTEGER,
    expense: DataTypes.BIGINT
  })
  // Budget.afterValidate(budget =>{
  //   budget.amount = Number(budget.amount)
  // })
  Budget.prototype.nameMonth = function(month) {
    return MonthHelper.ConvertMonth(month)
  }
  Budget.associate = function(models) {
    Budget.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' })
  }
  return Budget
}

'use strict'
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "wrong format email"
        },
        notEmpty: {
          msg: 'Email not null'
        },
        isUnique: function(value, next) {
          User.find({
            where: {
              email: value,
              id: { [sequelize.Op.ne]: this.id }
            }
          })
            .then(function(result) {
              if (result === null) {
                return next()
              } else {
                return next(' Email already use')
              }
            })
            .catch(err => {
              return next()
            })
        }
      }
    },
    hash: DataTypes.STRING
  })

  User.beforeCreate((user, option) => {
    return bcrypt.hash(user.hash, 10).then(function(hash) {
      user.hash = hash
      console.log(user.hash)
    })
  })

  User.prototype.comparePassword = function(plainPassword, hashPassword, cb) {
    bcrypt.compare(plainPassword, hashPassword).then(result => {
      cb(result)
    })
  }
  User.associate = function(models) {
    User.hasMany(models.Transaction, { foreignKey: 'userId', sourceKey: 'id' })
    User.hasMany(models.Wish, { foreignKey: 'userId', sourceKey: 'id' })
    User.hasMany(models.Budget, { foreignKey: 'userId', sourceKey: 'id' })
    User.hasMany(models.Category, { foreignKey: 'userId' })
  }
  return User
}

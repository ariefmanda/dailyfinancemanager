'use strict'
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: DataTypes.STRING
  })

  User.beforeCreate((user, option) => {
    return bcrypt.hash(user.hash, 10).then(function(hash) {
      user.hash = hash
      console.log(user.hash)
    })
  })

  User.prototype.comparePassword = function(plainPassword, hashPassword, cb) {
    bcrypt.compare(plainPassword, hashPassword)
    .then(result =>{
      cb(result)
    })
  }
  return User
}

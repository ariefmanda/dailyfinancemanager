const model = require('./models')




model.Budget.create({
  year: 2017,
  month: 2,
  amount:12098000000
}).then(user => {
  console.log(user)
})
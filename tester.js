const model = require('./models')




model.User.create({
  name : 'Arief',
  email: 'arief@gmail.com',
  hash: '1234'
}).then(user => {
  console.log(user)
})
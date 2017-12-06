const model = require('./models')




model.Transaction.update({
  name: 'Makan ayam',
  price: 2000,
  userId:2,
  categoryId:2
},{
  where:{
    id:1
  }
}).then(user => {
  console.log(user)
})
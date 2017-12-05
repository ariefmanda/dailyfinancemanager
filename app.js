const express = require('express')
const app = express()
const parse = require('body-parser')
const Auth = require('./routes/auth')
// const Transaction = require('./routes/transaction')
// const Wishlist = require('./routes/wishList')
// const Report = require('./routes/report')
// const Budget = require('./routes/budget')

app.use(parse.urlencoded({extended:false}))
app.use(parse.json())
app.set('view engine', 'ejs')
app.set('views', './views')
app.get('/',function(req,res) {
    res.render('',{})
})

app.use('/auth',Auth)
app.use('/transaction',Transaction)
app.use('/wishlist',Wishlist)
app.use('/report',Report)
app.use('/budget',Budget)


app.listen(3000,function(req,res){
    console.log('applikasi ini lewat port 3000')
})
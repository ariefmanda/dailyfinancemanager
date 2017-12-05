const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
// app.use(parse.json())
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret : 'iloveyou'
}))

app.use('/auth',require('./routes/auth'))
// app.use('/transaction',require('./routes/transaction'))
app.use('/wishlist',require('./routes/wisht'))
// app.use('/report',require('./routes/report'))
// app.use('/budget',require('./routes/budget'))
app.use('/',function(req,res) {
    res.render('home',{
        pageTitle : 'HOME'
    })
})
// app.use(errorHandler)

app.listen(3000,function(req,res){
    console.log('aplikasi ini lewat port 3000')
})



function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
      res.flash(err.errors.map(errorItem => errorItem.message).join('\n'))
    } else {
      console.log(err)
      res.send('Something wrong!. Please check console!')
    }
    if (res.headersSent) {
      return next(err)
    } else {
      res.redirect(req.url)
    }
  }
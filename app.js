const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const checkLoginHandler = require('./helpers/authHelper').checkLoginHandler
const app = express()
// app.use(parse.json())
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use(flashMessageHandler)
app.use(session({
    secret : 'iloveyou'
}))
app.use('/auth',require('./routes/auth'))
app.use('/transaction', checkLoginHandler, require('./routes/transaction'))
app.use('/wishlist', checkLoginHandler, require('./routes/wisht'))
app.use('/report', checkLoginHandler, require('./routes/report'))
app.use('/budget', checkLoginHandler, require('./routes/budget'))
app.use('/',function(req,res) {
    res.render('home',{
        pageTitle : 'Home'
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


  function flashMessageHandler(req, res, next) {
    res.flash = function(text) {
      res.cookie('nosy_flash_message', text, { httpOnly: true })
    }
    if (req.cookies.nosy_flash_message) {
      res.locals.flashMessage = req.cookies.nosy_flash_message
      res.clearCookie('nosy_flash_message')
    }
    next()
  }
  
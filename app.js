const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const checkLoginHandler = require('./helpers/authHelper').checkLoginHandler
const flashMessageHandler = require('./helpers/messageHelper').flashMessageHandler
const errorHandler = require('./helpers/errorHelper').errorHandler
const app = express()

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(
  session({
    secret: 'iloveyou'
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flashMessageHandler)
app.use('/transaction', checkLoginHandler, require('./routes/transaction'))
app.use('/wish', checkLoginHandler, require('./routes/wish'))
app.use('/report', checkLoginHandler, require('./routes/report'))
app.use('/budget', checkLoginHandler, require('./routes/budget'))
app.use('/category', checkLoginHandler, require('./routes/category'))
app.use('/auth', require('./routes/auth'))
app.use('/', function(req, res) {
  res.render('home', {
    pageTitle: 'Home'
  })
})
app.use(errorHandler)

app.listen(3000, function(req, res) {
  console.log('aplikasi ini lewat port 3000')
})





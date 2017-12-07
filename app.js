const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const checkLoginHandler = require('./helpers/authHelper').checkLoginHandler
const flashMessageHandler = require('./helpers/messageHelper').flashMessageHandler
const errorHandler = require('./helpers/errorHelper').errorHandler
const app = express()
let port = process.env.PORT || 3000
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
app.use('/auth', require('./routes/auth'))
app.use('/transaction', checkLoginHandler, require('./routes/transaction'))
app.use('/wish', checkLoginHandler, require('./routes/wish'))
app.use('/report', checkLoginHandler, require('./routes/report'))
app.use('/budget', checkLoginHandler, require('./routes/budget'))
app.use('/category', checkLoginHandler, require('./routes/category'))

app.use('/', function(req, res) {
  res.render('home', {
    pageTitle: 'Home'
  })
})
app.use(function(req, res, next) {
  res.locals.loggedInUser = req.session.loggedInUser;
  next();
});
app.use(errorHandler)

app.listen(port, function(req, res) {
  console.log('aplikasi ini lewat port 3000')
})





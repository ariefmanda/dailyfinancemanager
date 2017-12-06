function checkLoginHandler(req, res, next) {
  console.log('------->',req.url)
  login = req.session.loggedIn
  if(login){
    next()
  }else{
    req.session.loggedIn=true
    req.session.userId = 1
    next()
    // res.flash('Please Login before continue')
    // res.redirect('/auth/login')
  }
}

module.exports = {
  checkLoginHandler : checkLoginHandler
}


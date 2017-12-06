function checkLoginHandler(req, res, next) {
  console.log('------->',req.url)
  login = req.session.loggedIn
  if(login){
    next()
  }else{
    res.flash('Please Login before continue')
    res.redirect('/auth/login')
  }
}

module.exports = {
  checkLoginHandler : checkLoginHandler
}


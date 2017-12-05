function checkLoginHandler(req, res, next) {
  console.log('------->',req.url)
  login = true
  if(login){
    next()
  }else{
    res.flash('Please Login')
    res.redirect('/auth/login')
  }
}

module.exports = {
  checkLoginHandler : checkLoginHandler
}


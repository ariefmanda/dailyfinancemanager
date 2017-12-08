var express = require('express')
var router = express.Router()
const models = require('../models')

router.get('/login', (req, res, next) => {
  res.render('authLogin', {
    pageTitle: 'Login'
  })
})
router.post('/login', (req, res, next) => {
  let { email, password } = req.body
  models.User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if(user){
      user.comparePassword(password, user.hash, (success)=>{
        if(success){
          req.session.loggedIn = true
          req.session.userId = user.id
          req.session.user = user
          
          res.flash('Login Sukses')
          res.redirect('/transaction')
        }else{
          res.flash('Login Gagal')
          res.redirect('/auth/login')
        }
      }) 
    }else{
      res.flash('Email not found')
      res.redirect('/auth/login')
    }
  })
  .catch(next)
})

router.get('/signup', (req, res, next) => {
  res.render('authSignup', {
    pageTitle: 'Sign Up'
  })
})

router.post('/signup', (req, res, next) => {
  let newUser = {
    name: req.body.name,
    hash: req.body.password,
    email: req.body.email
  }
  models.User.create(newUser).then(user => {
    res.flash('Account created. Plase Login')
    res.redirect('/')
  }).catch(next)
})

router.get('/logout', (req,res,next) =>{
  req.session.destroy(()=>{
    res.flash('You Logged Out')
    res.locals.localsUserId = null
    
    res.redirect('/')
  })
})

module.exports = router

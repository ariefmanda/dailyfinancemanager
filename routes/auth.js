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
      
    }else{  
      render.send('email not found')
    }
  })
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
    res.send('oke')
  })
})

module.exports = router

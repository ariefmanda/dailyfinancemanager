var express = require('express');
var router = express.Router();
const models = require('../models')

router.get('/login', (req, res, next) => {
  res.render('authLogin', {
    pageTitle: 'Login'
  })
})

router.post('/login', (req, res, next) => {
})
router.get('/signup', (req, res, next) => {
  res.render('authSignup', {
    pageTitle: 'Sign Up'
  })
})

router.post('/signup', (req, res, next) => {
  
  res.send(req.body)
})

module.exports = router
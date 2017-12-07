var express = require('express')
var router = express.Router()
const models = require('../models')

router.get('/', function(req, res, next) {
  models.User.findById(req.session.userId)
    .then(user => {
      return Promise.all([user, user.getWishes()])
    })
    .then(([user, wishes]) => {
      res.render('wishList', {
        pageTitle: 'Wish List',
        wishes: wishes,
        user: user
      })
    })
    .catch(next)
})

router.get('/add', function(req, res) {
  res.render('wishForm', {
    wish: {
      name: req.query.name
    },
    pageTitle: 'Wish Add'
  })
})

router.post('/add', function(req, res) {
  if (req.body.yesno == 'Yes') {
    let wish = {
      name: req.body.name,
      fullfilled: false
    }
    models.Wish.create(wish)
      .then(() => {
        res.redirect('/wish')
      })
      .catch(next)
  } else {
    res.redirect('/transaction')
  }
})

router.get('/:id/edit', function(req, res) {
  models.Wish.findById(req.params.id)
    .then(wish => {
      res.render('wishForm', {
        pageTitle: 'wish Edit',
        wish: wish
      })
    })
    .catch(next)
})

router.post('/:id/edit', function(req, res) {
  let currentWish = {
    name: req.body.name,
    fullfilled: false
  }
  models.Wish.update(currentWish, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/wish')
    })
    .catch(next)
})

router.get('/:id/delete', function(req, res) {
  models.Wish.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      req.redirect('/wish')
    })
    .catch(next)
})

module.exports = router

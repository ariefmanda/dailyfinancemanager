var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  models.Wish.findAll()
    .then(wishes => {
      res.render('wishList', {
        pageTitle: 'Wish List',
        wishes: wishes
        
      });
    })
    .catch(next);
});

router.get('/add', function(req, res) {
  res.render('wishForm', {
    wish: {
      name: req.query.name
    },
    pageTitle: 'Wish Add'
  });
});

router.post('/add', function(req, res) {
  if (req.body.yesno == 'yes') {
    let wish = {
      name: req.body.name,
      fullfilled: false
    };
    models.Wish.create(wish)
      .then(() => {
        res.redirect('/wish');
      })
      .catch(next);
  } else {
    res.redirect('/transaction');
  }
});

router.get('/:id/edit', function(req, res) {
  models.Wish.findById(req.params.id)
    .then(wish => {
      res.render('wishForm', {
        pageTitle: 'wish Edit',
        wish: wish
      });
    })
    .catch(next);
});

router.post('/:id/edit', function(req, res) {
  let currentWish = {
    name: req.body.name,
    fullfilled: false
  };
  models.Wish.update(currentWish, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/wish')
    })
    .catch(next);
});

router.get('/:id/delete', function(req, res) {
  models.Wish.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
<<<<<<< HEAD:routes/wish.js
      req.redirect('/wish');
=======
      res.redirect('/wisht');
>>>>>>> 2a42e1bf8497c8e1a7e3df5dc85da1be5e32dcfb:routes/wisht.js
    })
    .catch(next);
});

module.exports = router;

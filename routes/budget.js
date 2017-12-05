var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  models.Budget.findAll()
    .then(Budgets => {
      res.render('budgetList', {
        budgets: Budgets,
        pageTitle: 'Budgets List'
      });
    })
    .catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('wishtForm', {
    wisht: {
      name: req.query.name
    },
    pageTitle: 'Wisht Add'
  });
});

router.post('/add', function(req, res, next) {
  if (req.body.yesno == 'yes') {
    let wisht = {
      name: req.body.name,
      fullfilled: false
    };
    models.Wish.create(wisht)
      .then(() => {
        res.redirect('/wisht');
      })
      .catch(next);
  } else {
    res.redirect('/transaction');
  }
});

router.get('/:id/edit', function(req, res, next) {
  models.Wish.findById(req.params.id)
    .then(wisht => {
      res.render('wishtForm', {
        pageTitle: 'Wisht Edit',
        wisht: wish
      });
    })
    .catch(next);
});

router.post('/:id/edit', function(req, res, next) {
  let wisht = {
    name: req.body.name,
    fullfilled: false
  };
  models.Wisht.update(wisht, {
    where: {
      id: req.params.id
    }
  })
    .then(() => [res.redirect('/wisht')])
    .catch(next);
});

router.get('/:id/delete', function(req, res, next) {
  models.Wish.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      req.redirect('/wisht');
    })
    .catch(next);
});

module.exports = router;

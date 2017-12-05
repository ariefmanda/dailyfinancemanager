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
  res.render('budgetForm', {
    budget:'',
    pageTitle: 'Budget Add'
  });
});

router.post('/add', function(req, res, next) {
<<<<<<< HEAD
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
=======
  let newBudget = {
    year: req.body.year,
    month: req.body.month,
    amount: req.body.amount
  };
  models.Budget.create(newBudget)
    .then(() => {
      res.redirect('/budget');
    })
    .catch(next);
});

router.get('/:id/edit', function(req, res, next) {
  models.Budget.findById(req.params.id)
    .then(Budgets => {
      res.render('budgetForm', {
        pageTitle: 'Budget Edit',
        budget: Budgets
>>>>>>> 2a42e1bf8497c8e1a7e3df5dc85da1be5e32dcfb
      });
    })
    .catch(next);
});

router.post('/:id/edit', function(req, res, next) {
  let budget = {
    year: req.body.year,
    month: req.body.month,
    amount: req.body.amount
  };
  models.Budget.update(budget, {
    where: {
      id: req.params.id
    }
  })
    .then(() => [res.redirect('/budget')])
    .catch(next);
});

router.get('/:id/delete', function(req, res, next) {
<<<<<<< HEAD
  models.Wish.destroy({
=======
  models.Budget.destroy({
>>>>>>> 2a42e1bf8497c8e1a7e3df5dc85da1be5e32dcfb
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/budget');
    })
    .catch(next);
});

module.exports = router;

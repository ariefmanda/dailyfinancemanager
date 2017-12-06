var express = require('express')
var router = express.Router()
const models = require('../models')

router.get('/', function(req, res, next) {
  models.User.findById(req.session.userId)
    .then(user => Promise.all([user, user.getBudgets()]))
    .then(([user, budgets]) => {
      res.render('budgetList', {
        user: user,
        budgets: budgets,
        pageTitle: 'Budgets List'
      })
    })
    .catch(next)
})

router.get('/add', function(req, res, next) {
  models.User.findById(req.session.userId).then(User => {
    res.render('budgetForm', {
      budget: false,
      pageTitle: 'Budget Add'
    })
  })
})

router.post('/add', function(req, res, next) {
  let newBudget = {
    userId: req.session.userId,
    year: req.body.year,
    month: req.body.month,
    amount: req.body.amount,
    expense: 0
  }
  models.User.findById(req.session.userId)
    .then(user => models.Budget.create(newBudget))
    .then(() => {
      res.redirect('/budget')
    })
    .catch(next)
})

router.get('/:id/edit', function(req, res, next) {
  models.Budget.findById(req.params.id)
    .then(budget => {
      
      res.render('budgetForm', {
        pageTitle: 'Budget Edit',
        budget: budget
      })
    })
    .catch(next)
})

router.post('/:id/edit', function(req, res, next) {
  let budget = {
    year: req.body.year,
    month: req.body.month,
    amount: req.body.amount
  }
  models.Budget.update(budget, {
    where: {
      userId: req.session.userId,
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/budget')
    })
    .catch(next)
})

router.get('/:id/delete', function(req, res, next) {
  models.Budget.destroy({
    where: {
      userId: req.session.userId,
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/budget')
    })
    .catch(next)
})

module.exports = router

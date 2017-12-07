var express = require('express')
var router = express.Router()
const models = require('../models')

router.get('/', function(req, res, next) {
  models.User.findById(req.session.userId)
    .then(user =>
      Promise.all([
        user,
        user.getBudgets({
          order : [
            ['year', 'ASC'],
            ['month', 'ASC'],
            
          ],
          include: [
            {
              model: models.Category,
              include: [
                {
                  model: models.Transaction,
                }
              ]
            }
          ]
        })
      ])
    )
    .then(([user, budgets]) => {
      // console.log(budgets[0].Categories[0].Transactions)
      res.render('budgetList', {
        pageTitle: 'Budgets List',
        user: user,
        budgets: budgets
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

router.get('/:id/assignCatBudget', (req, res, next) => {
  Promise.all([
    models.Budget.findById(req.params.id, {
      include: [
        {
          model: models.Category,
          
        }
      ]
    }),
    models.Category.findAll({
      where : {
        userId : req.session.userId
      }
    })
  ])
    .then(([budget, categories]) => {
      res.render('budgetAssignCastForm', {
        pageTitle: 'Add budget Category',
        budget,
        categories,
        budgetCategory: false,
        total: budget.Categories.reduce((acc, category) => {
          return acc + Number(category.BudgetCategory.amount)
        }, 0)
      })
    })
    .catch(next)
})

router.post('/:id/assignCatBudget', (req, res, next) => {
  Promise.all([
    models.Budget.findById(req.params.id, {
      include: [
        {
          model: models.Category
        }
      ]
    }),
    models.Category.findAll()
  ])
    .then(([budget, categories]) => {
      let total = budget.Categories.reduce((acc, category) => {
        return acc + Number(category.BudgetCategory.amount)
      }, 0)

      if (total + Number(req.body.amount) > budget.amount) {
        res.flash('Amount melebihi total sisa budget')
        res.redirect('/budget/' + req.params.id + '/assignCatBudget')
      } else {
        models.BudgetCategory.create({
          budgetId: budget.id,
          categoryId: req.body.categoryId,
          amount: req.body.amount
        })
          .then(() => {
            res.redirect('/budget')
          })
          .catch(next)
      }
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

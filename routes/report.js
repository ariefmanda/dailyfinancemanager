var express = require('express')
var router = express.Router()
const models = require('../models')
const MonthHelper = require('../helpers/monthHelper')

router.get('/', (req, res, next) => {
  let convertDate = MonthHelper.ConvertDate(new Date())
  models.User.findById(req.session.userId).then(user => {
    user
      .getBudgets({
        include: [
          {
            model: models.Category,
            include: [
              {
                model: models.Transaction
              }
            ]
          }
        ]
      })
      .then(budgets => {
        budgets.map(budget => {
          budget.expensess = budget.Categories.reduce((ecc, category) => {
            if(Number(budget.year)>convertDate[2]){
              return 0
            }else if(Number(budget.year)==convertDate[2]){
              if(Number(budget.month)>convertDate[1]&&Number(budget.month)!=12){
                return 0
              }
            }
            return (
              ecc +
              category.Transactions.reduce((acc, transaction) => {
                return acc + transaction.price
              }, 0)
            )
          }, 0)
        })
        let totalExpensess = budgets.reduce((acc, budget) => {
          return acc + budget.expensess
        }, 0)
        let totalBudgets = budgets.reduce((acc, budget) => {
          return acc + Number(budget.amount)
        }, 0)
        res.render('reportList', {
          totalBudgets: totalBudgets,
          totalExpensess: totalExpensess,
          budgets: budgets,
          pageTitle: 'Report List'
        })
        res.send('ok')
      })
      .catch(next)
  })
})

router.get('/budget/:id/detail', (req, res, next) => {
  models.User.findById(req.session.userId)
    .then(user => {
      user
        .getBudgets({
          where: {
            id: req.params.id
          },
          include: [
            {
              model: models.Category,
              include: [
                {
                  model: models.Transaction
                }
              ]
            }
          ]
        })
        .then(budget => {
          budget = budget[0]
          console.log(budget.id)
          let obj = {}
          let array = []
          if (budget.Categories) {
            console.log(array)
            budget.Categories.map(category => {
              if (category.Transactions) {
                category.Transactions.map(transaction => {
                  if (transaction) {
                    obj = {}
                    obj.budget = category.BudgetCategory.amount
                    obj.name = transaction.name
                    obj.date = MonthHelper.ConvertDate(transaction.createdAt)
                    obj.category = category.name
                    obj.price = Number(transaction.price)
                    array.push(obj)
                  }
                })
              }
              return category
            })
          }
          console.log()
          array.sort(function(a, b) {
            return a.date[0] - b.date[0]
          })
          res.render('reportDetail', {
            budget: budget,
            transactions: array,
            pageTitle: `Detail Report Bulan ${budget.month} Tahun ${
              budget.year
            }`
          })
        })
        .catch(next)
    })
    .catch(next)
})

module.exports = router

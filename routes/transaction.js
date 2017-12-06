import { Number } from 'core-js/library/web/timers'

var express = require('express')
var router = express.Router()
const models = require('../models')

router.get('/', (req, res, next) => {
  models.User.findById(req.session.userId)
    .then(user => {
      user
        .getTransactions({ include: [models.Category] })
        .then(transactions => {
          res.render('transactionList', {
            user: user,
            transactions: transactions,
            pageTitle: 'List Transactions'
          })
        })
        .catch(next)
    })
    .catch(next)
})
router.get('/add', function(req, res, next) {
  models.Category.findAll().then(categories => {
    res.render('transactionForm', {
      transaction: false,
      categories: categories,
      pageTitle: 'Transaction Add'
    })
  })
})

router.post('/add', function(req, res, next) {
  models.User.findById(req.session.id)
    .then(user => {
      user
        .getBudget({
          where: {
            month: req.body.month,
            year: req.body.year
          }
        })
        .then(budget => {
          // check budeget cukup ata
          let priceNum = Number(req.body.price)
          if (budget.expense + priceNum > budget.amount) {
            res.flash('budget gak cukup')
            res.redirect('/wish/add')
          } else {
            budget.expense += priceNum
            budget
              .save()
              .then(() => {
                user
                  .addTransaction({
                    name: req.body.name,
                    price: priceNum,
                    categoryId: req.body.categoryId
                  })
                  .then(() => {
                    res.flash('OK masuk')
                    res.redirect('/transaction')
                    // user.getWish({
                    //   where : {
                    //     id: req.body.wishId
                    //   }
                    // }).then(wish =>{
                    //   wish.fullfilled = true
                    //   wish.save().then(()=>{
                    //     res.redirect('/transaction')
                    //   })
                    // })
                  })
              })
              .catch(next)
          }
        })
        .catch(next)
    })
    .catch(next)
})

module.exports = router

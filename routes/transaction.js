var express = require('express')
var router = express.Router()
const models = require('../models')
const MonthHelper = require('../helpers/monthHelper')

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
  models.User.findById(req.session.userId)
    .then(user => {
      user
        .getWishes()
        .then(wishes => {
          models.Category.findAll({
            where:{
              userId:req.session.userId
            }
          })
            .then(categories => {
              res.render('transactionForm', {
                wishes: wishes,
                transaction: false,
                categories: categories,
                pageTitle: 'Transaction Add'
              })
            })
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
})

router.post('/add', function(req, res, next) {
  let convertDate = MonthHelper.ConvertDate(new Date())
  let priceNum = Number(req.body.price)
  models.User.findById(req.session.userId)
    .then(user =>
      Promise.all([
        user,
        models.Budget.findOne({
          where: {
            userId: user.id,
            month: convertDate[1],
            year: convertDate[2]
          }
        })
      ])
    )
    .then(([user, budget]) => {
      if (Number(budget.expense) + priceNum > budget.amount) {
        res.flash('budget gak cukup')
        res.redirect(`/wish/add?${req.body.name}`)
      } else {
        budget.expense = Number(budget.expense) + priceNum
        return Promise.all([user, budget.save()])
      }
    })
    .then(([user, budget]) => {
      return Promise.all([
        user,
        budget,
        models.Transaction.create(
          {
            name: req.body.name,
            price: priceNum,
            categoryId: req.body.categoryId,
            userId: user.id
          }
        ),
        models.Wish.update({
          fullfilled:true
        },{
          where:{
            userId:user.id,
            id:req.body.wishId
          }
        })
      ])
    })
    .then(([user,budget,wish,transaction]) => {
      res.redirect('/transaction')
    })
    .catch(next)
})

router.get('/:id/edit', function(req, res, next) {
  models.User.findById(req.session.userId)
    .then(user => {
      user
        .getWishes()
        .then(wishes => {
          user
            .getTransactions({
              where: {
                id: req.params.id
              }
            })
            .then(transaction => {
              models.Category.findAll({
                where:{
                  userId:req.session.userId
                }
              })
                .then(categories => {
                  res.render('transactionForm', {
                    wishes: wishes,
                    transaction: transaction[0],
                    categories: categories,
                    pageTitle: 'Transaction Edit'
                  })
                })
                .catch(next)
            })
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
})



router.post('/:id/edit', function(req, res, next) {
  let convertDate = MonthHelper.ConvertDate(new Date())
  models.User.findById(req.session.userId)
    .then(user =>
      Promise.all([
        user,
        models.Budget.findOne({
          where: {
            userId: user.id,
            month: convertDate[1],
            year: convertDate[2]
          }
        }),
        models.Transaction.findOne({
          where:{
            id:req.params.id,
            userId:user.id
          }
        })
      ])
    )
    .then(([user, budget,transaction]) => {
      let selisih = req.body.price - transaction.price
      if ((Number(budget.expense) + selisih) > budget.amount) {
        res.flash('budget gak cukup')
        res.redirect(`/wish/add?${req.body.name}`)
      } else {
        budget.expense = Number(budget.expense) + selisih
        return Promise.all([user, budget.save(),transaction])
      }
    })
    .then(([user, budget,transaction])=>{
      return Promise.all([models.Transaction.update({
        name:req.body.name,
        categoryId:req.body.categoryId,
        price:req.body.price
      },{
        where:{
          userId:user.id,
          id:transaction.id
        }
      })])
    })
    .then(([user,budget,transaction]) => {
      res.redirect('/transaction')
    })
    .catch(next)
})

router.get('/:id/delete', (req, res, next) => {
  let convertDate = MonthHelper.ConvertDate(new Date())
  models.User.findById(req.session.userId)
    .then(user =>
      Promise.all([
        user,
        models.Budget.findOne({
          where: {
            userId: user.id,
            month: convertDate[1],
            year: convertDate[2]
          }
        }),
        models.Transaction.findOne({
          where:{
            id:req.params.id,
            userId:user.id
          }
        })
      ])
    )
    .then(([user, budget,transaction]) => {
      budget.expense=Number(Number(budget.expense)-Number(transaction.price))
      console.log(budget.expense)
      return Promise.all([user, budget.save(),transaction])
    }).then(([user, budget,transaction])=>{
      models.Transaction.destroy({
        where:{
          id:req.params.id,
          userId:user.id
        }
      }).then(()=>{
        res.redirect('/transaction')
      })
    })
    .catch(next)
})

module.exports = router

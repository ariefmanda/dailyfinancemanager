var express = require('express')
var router = express.Router()
const models = require('../models')
const MonthHelper = require('../helpers/monthHelper')

router.get('/', (req, res, next) => {
  models.User.findById(req.session.userId)
    .then(user => {
      user
        .getTransactions({order:[
          ['createdAt', 'ASC']
        ], include: [models.Category] })
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
  let convertDate = MonthHelper.ConvertDate(new Date())
  models.User.findById(req.session.userId)
    .then(user => {
      user
        .getWishes({
          where:{
            fullfilled:false
          }
        })
        .then(wishes => {
        user
        .getBudgets({
          where: {
            userId: user.id,
            month: convertDate[1],
            year: convertDate[2]
          },
          include:[{
            model:models.Category
          }]
        })
        .then(budget => {
              res.render('transactionForm', {
                wishes: wishes,
                transaction: false,
                budget: budget[0],
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
        res.redirect(`/wish/add?name=${req.body.name}`)
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
  let convertDate = MonthHelper.ConvertDate(new Date())
  models.User.findById(req.session.userId)
    .then(user => {
      user
        .getWishes({
          where:{
            fullfilled:false
          }
        })
        .then(wishes => {
          models.Transaction.findById(req.params.id)
            .then(transaction => {
              user.getBudgets({
                where: {
                  userId: user.id,
                  month: convertDate[1],
                  year: convertDate[2]
                },
                include:[{
                  model:models.Category
                }]
              })
                .then(budget => {
                  res.render('transactionForm', {
                    user: user,
                    wishes: wishes,
                    transaction: transaction,
                    budget: budget[0],
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
      if(Number(req.body.wishId)!==0){
        models.Wish.update({
          fullfilled:true
        },{
          where:{
            id:req.body.wishId,
            userId:user.id
          }
        })
      }
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

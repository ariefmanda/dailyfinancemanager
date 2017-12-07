var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  models.Category.findAll({
      where:{
        userId:req.session.userId,
      },
      order:[['name','ASC']]
  })
    .then(categories => {
      res.render('categoryList', {
        categories: categories,
        pageTitle: 'Category List'
      });
    })
    .catch(next);
});

router.get('/add', (req, res, next) => {
  res.render('categoryForm', {
    pageTitle: 'Category Add'
  });
});

router.post('/add', (req, res, next) => {
  let newCategory = {
    name: req.body.name
  };
  models.Category.create(newCategory,{where:{
    userId:req.session.userId,
  }})
    .then(() => {
      res.redirect('/category');
    })
    .catch(next);
});

router.get('/:id/edit', function(req, res, next) {
    models.Category.find({
      where:{
        userId:req.session.userId,
        id:req.params.id
      },
    })
      .then(Category => {
        res.render('categoryForm', {
          pageTitle: 'Category Edit',
          category:Category
        });
      })
      .catch(next);
  });
  
  router.post('/:id/edit', function(req, res, next) {
    let category = {
      name: req.body.name,
    };
    models.Category.update(category, {
      where: {
        userId:req.session.userId,
        id: req.params.id
      }
    })
      .then(() => [res.redirect('/category')])
      .catch(next);
  });
  
  router.get('/:id/delete', function(req, res, next) {
    models.Category.destroy({
      where: {
        userId:req.session.userId,
        id: req.params.id
      }
    })
      .then(() => {
        req.redirect('/category');
      })
      .catch(next);
  });


module.exports = router;

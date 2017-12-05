var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', function(req, res) {
  models.Wisht.findAll()
    .then(Whists => {
      res.render('wishList', {
        wishts: Whists,
        pageTitle: 'Whist List'
      });
    })
    .catch(next);
});

router.get('/add', function(req, res) {
  res.render('wishtForm', {
    wisht: {
      name: req.query.name
    },
    pageTitle: 'Wisht Add'
  });
});

router.post('/add', function(req, res) {
  if (req.body.yesno == 'yes') {
    let wisht = {
      name: req.body.name,
      fullfilled: false
    };
    models.Whist.create(wisht)
      .then(() => {
        res.redirect('/wisht');
      })
      .catch(next);
  } else {
    res.redirect('/transaction');
  }
});

router.get('/:id/edit', function(req, res) {
  models.Whist.findById(req.params.id)
    .then(wisht => {
      res.render('wishtForm', {
        pageTitle: 'Wisht Edit',
        wisht: whist
      });
    })
    .catch(next);
});

router.post('/:id/edit', function(req, res) {
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

router.get('/:id/delete', function(req, res) {
  models.Whist.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/wisht');
    })
    .catch(next);
});

module.exports = router;

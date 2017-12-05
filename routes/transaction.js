var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('ok transation')
});

module.exports = router;

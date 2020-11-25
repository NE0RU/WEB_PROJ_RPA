var express = require('express');
var router = express.Router();

var Num;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('boardfail.ejs', {
    reason: reason
  });
});

module.exports = router;

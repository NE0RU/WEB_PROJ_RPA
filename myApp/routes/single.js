var express = require('express');
var router = express.Router();

var model = require('../model/DBBoard');

var Num;

/* GET home page. */
router.get('/', function(req, res, next) {
  Num = req.body.number || req.query.number;
  console.log('Index');
  console.log('Number : ' + Num);
  model.BoardList({query : {}, callback: function(docs){
      res.render('single.ejs', {
          list: docs,
          session : req.session.user,
          Num: Num
      });
  }});
});
module.exports = router;

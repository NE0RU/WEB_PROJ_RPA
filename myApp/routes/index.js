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
      res.render('index.ejs', {
          list: docs,
          session : req.session.user,
          Num: Num,
          search: req.body.query || req.query.query || search
      });
  }});
});

router.post('/', function(req, res){
  console.log('search');
  var paramquery = req.body.query || req.query.query;
  console.log(paramquery);
  search = paramquery;
  res.redirect('/');
});

module.exports = router;
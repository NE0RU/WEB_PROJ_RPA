var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('info.ejs', {
    session : req.session.user
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();

var model = require('../model/DB');

router.get('/', function(req, res, next) {
    res.render('signup.ejs', {
        session : req.session.user
    });
  });

router.post('/', function(req, res){
    console.log('회원가입');
    var dt = new Date();
    var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
    var paramID = req.body.id || req.query.id;
    var paramPW = req.body.pw || req.query.pw;
    var paramName = req.body.name || req.query.name;
    console.log('paramID : ' + paramID + ', paramPW : ' + paramPW + ', paramName : ' + paramName + ', DateTime : ' + d);
    if(req.body.id && req.body.pw && req.body.name && d){
        console.log('DB삽입시도');
        model.checkmemberID(paramID, function(err, docs){
          if(err){
            console.log('Error!!!');
            res.redirect('signupfail');
            return;
          }if(docs){
            if (req.session.user) {
              console.log('이미 가입되어 있음');
              reason = "이미 가입되어 있는 아이디입니다."
              res.redirect('signupfail');
          }else {
            req.session.user =
                {
                    id: docs[0].id,
                    pw: docs[0].pw,
                    name: docs[0].name,
                    authorized: true
                };
                res.redirect('login');
          }
          }else{  
            model.addUser(paramID, paramPW, paramName, d, function(err, result){
                if(err){
                    console.log('Error!!!');
                    res.redirect('signupfail');
                    return;
                }if(result){
                    console.dir('성공');
                    res.redirect('signupsuccess');
                }else{
                    console.log('추가 안됨 Error!!!');
                    res.redirect('signupfail');
                }
            });
          }
        });
    }else{
        console.log('입력값이 없음');
        reason = "입력값이 없습니다."
        res.redirect('signupfail');
    }
});

module.exports = router;
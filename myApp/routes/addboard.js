var express = require('express');
var router = express.Router();

var Board = require('../model/DBBoard');

var model = require('../model/DBFile');

var Num;

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'public/images/' });

router.get('/', function(req, res, next) {
  res.render('addboard.ejs', {
    session : req.session.user
  });
});

router.post('/', upload.single('userfile'), function(req, res){
    console.log(req.file);
    if(req.file){  
        var path = req.file.path;
        console.log('입력값이 있음');
        model.addfile(req.file, function(err, result){
            if(err){
                console.log('Error!!!');
                reason = "에러"
                res.redirect('boardfail');
                return;
            }if(result){
                console.dir('성공');
            }else{
                console.log('추가 안됨 Error!!!');
                reason = "에러"
                res.redirect('boardfail');
            }
        });
     }else{
       console.log('입력값이 없음');
       var path = "public/images/pic01";
    }
    console.log('게시물 작성');
    var dt = new Date();
    var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
    var paramID = req.session.user.name || req.body.name || req.query.name;
    var paramTitle = req.body.title || req.query.title;
    var paramSubTitle = req.body.Sub_title || req.query.Sub_title;
    var paramContent = req.body.content || req.query.content;
    if(paramSubTitle == undefined){
        paramSubTitle = "Let's talk about us."
    }
    console.log(paramSubTitle);
    console.log(paramID);
    console.log('paramID : ' + paramID + ', paramTitle : ' + paramTitle + ', paramContent : ' + paramContent + ', DateTime : ' + d);
    if(paramID  && paramTitle && paramContent){
        console.log('게시물 작성 시도');
        Board.addboard(paramID, paramTitle, paramSubTitle, paramContent, d, path, function(err, result){
            if(err){
                console.log('Error!!!');
                reason = "에러"
                res.redirect('boardfail');
                return;
            }if(result){
                console.dir('성공');
                res.redirect('/');
            }else{
                console.log('추가 안됨 Error!!!');
                reason = "에러"
                res.redirect('boardfail');
            }
        });
    }else{
        console.log('게시글이 없음');
        reason = "입력값이 없습니다."
        res.redirect('boardfail');
    }
});

module.exports = router;
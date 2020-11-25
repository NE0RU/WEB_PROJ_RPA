var express = require('express');
var router = express.Router();

var model = require('../model/DBFile');

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'public/images/' });

router.get('/', function(req, res, next) {
    res.render('', {
        session : req.session.user
    });
  });

router.post('/', upload.single('userfile'), function(req, res){
    console.log("파일 업로드");
    console.log(req.file);
    if(req.file){  
        console.log('입력값이 있음');
        model.addfile(req.file, function(err, result){
            if(err){
                console.log('Error!!!');
                res.redirect('/addboardfree');
                return;
            }if(result){
                console.dir('성공');
                res.redirect('/addboardfree');
            }else{
                console.log('추가 안됨 Error!!!');
                res.redirect('/addboardfree');
            }
        });
     }else{
       console.log('입력값이 없음');
       res.redirect('/addboardfree');
     }
});

module.exports = router;
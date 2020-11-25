var express = require('express');
var router = express.Router();

router.get("/", function(req,res,next){
    if (req.session.file) {
        console.log('파일 수정 처리');
        console.log(req.session.file);
        req.session.file.processDelete();
    } else {
        console.log('파일 없음');
        res.redirect('/addboardfree');
    }
})

module.exports = router;

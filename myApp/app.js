var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var logger = require('morgan');
var bodyParser_post = require('body-parser');       //post 방식 파서
var date = require('date-utils');
var multer = require("multer"); // 파일 업로드를 위해 multer 모듈을 사용합니다.​  
var fs = require("fs"); // 파일시스템 접근을 위한 모듈 호출 
var upload = multer({ dest: 'images/' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var test = require('./routes/test');
var single = require('./routes/single');
var info = require('./routes/info');
var login = require('./routes/login');
var logout = require('./routes/logout');
var loginfail = require('./routes/loginfail');
var signup = require('./routes/signup');
var signupfail = require('./routes/signupfail');
var signupsuccess = require('./routes/signupsuccess');
var addboard = require('./routes/addboard');
var addboardfree = require('./routes/addboardfree');
var boardfail = require('./routes/boardfail');
var upload = require('./routes/upload');
var editfile = require('./routes/editfile');
var editboard = require('./routes/editboard');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser_post.urlencoded({ extended: false }));            // post 방식 세팅
app.use(bodyParser_post.json());                                     // json 사용 하는 경우의 세팅
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  key: 'sid', 
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', test);
app.use('/single', single);
app.use('/info', info);
app.use('/login', login);
app.use('/logout', logout);
app.use('/loginfail', loginfail);
app.use('/signup', signup);
app.use('/signupfail', signupfail);
app.use('/signupsuccess', signupsuccess);
app.use('/addboard', addboard);
app.use('/addboardfree', addboardfree);
app.use('/boardfail', boardfail);
app.use('/upload', upload);
app.use('/editfile', editfile);
app.use('/editboard', editboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

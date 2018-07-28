var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//设置视图文件夹的位置
app.set('views', path.join(__dirname, 'views'));

//设置项目使用ejs模块引擎
app.set('view engine', 'ejs');

//使用日志记录中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//使用cookieparse中间件
app.use(cookieParser());
//使用express默认的static中间件设置静态资源文件夹的位置
app.use(express.static(path.join(__dirname, 'public')));

//使用路由index  users
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

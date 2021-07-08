var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtAuth =require('./utils/jwt');

//连接数据库
require('./data/database.js');

//一级路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var classRouter = require('./routes/class');
var teacherRouter =require('./routes/teacher');
var imageRouter =require('./routes/image');

var app = express();
//使用cors解决跨域
var allowCrossDomain =function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","X-Requested-With,Origin,Content-Type,Accept,Authorization");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,POTIONS");
  res.header("Access-Control-Allow-Credentials",'true');
  next();
};
app.use(allowCrossDomain);//使用该中间件在服务端解决跨域

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(jwtAuth);//身份认证
//用于匹配ajax请求中的一级路径
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/class',classRouter);
app.use('/teacher',teacherRouter);
app.use('/image',imageRouter);

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

 // module.exports = app;
app.listen(3000,() => console.log('3000端口启动成功!'))
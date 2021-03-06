var sslRedirect = require('heroku-ssl-redirect');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer();

/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
*/
var app = express();
app.use(sslRedirect());

// for parsing multipart/form-data
app.use(upload.array()); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', '*');
  /*
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  */
 /*
  console.log("do >>> ",app.get("crosDomains"));
  var crosDomains = app.get("crosDomains").split(",");
  var origin = req.headers.origin;
  console.log("origin >>> ",origin);
  if(crosDomains.indexOf(origin) > -1) {
    console.log("origin found >>> ",origin);
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
 */
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

require('./config')(app);
//require('./db/repository')(app,mongoose);
//require('./models')(app,mongoose);
require('./routes')(app,mongoose);


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

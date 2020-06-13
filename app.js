var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expressSession = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
require('./models');
var compression = require('compression');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public')));
app.use(compression());


app.get('/',function(req, res, next) {
    res.render('index');
});
app.get('/success',function(req, res, next) {
  res.render('success');
});

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


//Heroku Build Process - Serve static assets if in production
if(process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));

  app.get('*', (request, response) => {
      response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

}

//Define Port and Start server
const port = process.env.PORT || 5000;
app.listen(port, function (req, res) {
  console.log(`Server running at ${port}`);
});
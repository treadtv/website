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

//compression
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'))
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}


app.get('/',function(req, res, next) {
    res.render('index');
});
app.get('/success',function(req, res, next) {
  res.render('success');
});

app.get('/workout/:id',function(req, res, next) {
  res.render('workout');
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


//Define Port and Start server
const port = process.env.PORT || 5000;
app.listen(port, function (req, res) {
  console.log(`Server running at ${port}`);
});
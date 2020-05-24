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

var User = mongoose.model('User'); 

mongoose.connect('mongodb://localhost:27017/kwan-db',{ useNewUrlParser: true, useUnifiedTopology: true });

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
app.use(expressSession({
  secret: "dffhdgnfmjhrgfgmghmjmdrdeyjhmhmjgmfnghmhjfgfnghmghmhjmjhmjhjhnvvb"
}));
app.use(passport.initialize());
app.use(passport.session()); //to get some data and not query db every login time

passport.use(new localStrategy(
  {usernameField : "email",
passwordField : "password"},
  function(email, password, next) {
    User.findOne({ email: email }, function (err, user) {
      if (err)  return next(err); 
      if (!user || !bcrypt.compareSync(password,user.passwordHash))  return next({message:'wrong email/password'});    
      
      next(null,user);  
    }
    );
  }
));

passport.use('signup-local',new localStrategy(
  {usernameField : "email",
passwordField : "password"},
  function(email, password, next) {
    User.findOne({
      email:email
    }, function(err,user){
      if(err) return next(err);
      if(user) return next({message:'User already exists'});
      let newUser  = new User ({
        email : email,
        passwordHash : bcrypt.hashSync(password,10)
    });
    newUser.save(function(err){
     next(err,newUser);
    });
    }
    );
  }
));

// to reduce size of user
passport.serializeUser(function(user,next){
next(null,user._id); 
});
 
passport.deserializeUser(function(id,next){
  User.findById(id,function(err,user){
    next(err,user);
  });
});

app.get('/',function(req, res, next) {
    res.render('index',{title:'KWAN tutorial'});
});
app.get('/main',function(req, res, next) {
  res.render('main');
});

app.get('/builder',function(req, res, next) {
  res.render('builder');
});
app.get('/workouts/:id',function(req, res, next) {
res.render('workout');
 

});
app.get('/walkthrough',function(req, res, next) {
  req.session.sawWalkthrough = 1;
  res.end();
});
app.get('/complicated',function(req, res, next) {
  console.log( req.session.sawWalkthrough);
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login-page' }),
  function(req, res) {
    res.redirect('/main');
  });


app.get('/login-page',function(req, res, next) {
  res.render('login-page');
});
//for more sensitive data use post
app.post('/signup', 
  passport.authenticate('signup-local', { failureRedirect: '/login-page' }),
  function(req, res) {
    res.redirect('/main');
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

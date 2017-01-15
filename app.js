'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
<<<<<<< HEAD
var session = require('express-session');
=======

>>>>>>> origin/CRUDarticle

const routes = require('./app/routes/index');
const users = require('./app/routes/users');
const articles = require('./app/routes/articles');

const app = express();
<<<<<<< HEAD
const User = mongoose.model('User');
=======
>>>>>>> origin/CRUDarticle

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD
app.use(session(
    { secret: 'keyboard cat',
      id_user: ' '
    }));

=======

// ajoute des routes
>>>>>>> origin/CRUDarticle
app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/morpion', function(err) {
  if (err) { throw err; }
});

module.exports = app;

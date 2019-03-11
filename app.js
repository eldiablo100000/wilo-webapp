var html = require('html');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var api = require('./routes/api');
var user = require('./routes/user');
const config = require('./routes/config');
var app = express();
var drop = false
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mean', { promiseLibrary: require('bluebird'),  useNewUrlParser: true })
  .then(function() {

        console.log('connection succesful')
        if(drop) mongoose.connection.db.dropDatabase()
        }
  )
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/myapp', express.static(path.join(__dirname, 'dist')));
app.use('/api', api)

app.use('/auth/user', user);
app.set('view engine', 'html')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

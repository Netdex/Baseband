var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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

function parseModules(json) {
  list = JSON.parse(json);
  list.sort(new function(a, b) {
    return a.priority - b.priority;
  });

  for(var module in list) {
    addModule(module.name, module.desc, module.score);
  }

}

function addModule(name, desc, score) {
  var mainDiv = document.getElementById("main-div");

  var container = document.createElement("DIV");
  var leftDiv = document.createElement("DIV");
  var nameDiv = document.createElement("DIV");
  var descDiv = document.createElement("DIV");
  var scoreDiv = document.createElement("DIV");

  var nameText = document.createTextNode(name);
  var descText = document.createTextNode(desc);
  var scoreText = document.createTextNode(score + "%");

  nameDiv.appendChild(nameText);
  nameDiv.setAttribute("class", "name");
  descDiv.appendChild(descText);
  descDiv.setAttribute("class", "desc");

  scoreDiv.appendChild(scoreText);
  scoreDiv.setAttribute("class", "list-group-item");
  scoreDiv.setAttribute("class", "right-div");

  leftDiv.appendChild(nameDiv);
  leftDiv.appendChild(descDiv);
  leftDiv.setAttribute("class", "list-group-item");
  leftDiv.setAttribute("class", "left-div");

  container.appendChild(leftDiv);
  container.appendChild(scoreDiv);
  container.setAttribute("class", "container-div");
  container.setAttribute("class", "list-group-item");
  container.setAttribute("class", "container-div");

  mainDiv.appendChild(container);
}

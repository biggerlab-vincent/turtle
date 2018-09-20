var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//MongoStores使用
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
//bodyParser
var bodyParser = require('body-parser');
//express-favicon
var favicon = require('serve-favicon')

var app = express();
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//favicon
app.use(favicon(path.join(__dirname ,'public/images','favicon.ico')));
//mongoose
var mongoose = require('mongoose')
//Set up default mongoose connection
var mongoDB = 'mongodb://47.100.121.67/turtle';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', function(){
  console.log('MongoDB Connection Successed');
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('usersession'));
app.use(express.static(path.join(__dirname, 'public')));
//express session使用
app.use(session({
    secret: 'usersession',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30, // harlf of hour
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection //使用已有的数据库连接
  })
}))

app.use('/', indexRouter);


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

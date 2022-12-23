const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars')
const session = require('express-session');
const hbs = require('hbs');
const passport = require('./config/passport');
const homeRouter = require('./home/homeRouter');
const productRouter = require('./products/productRouter');
const detailRouter = require('./products/detailRouter');
const usersRouter = require('./users/userRouter');
const feedbackRouter = require('./feedback/feedbackRouter');
const recycleRouter = require('./recycles/recycleRouter');
const charityRouter = require('./charities/charityRouter');
const orderRouter = require('./orders/orderRouter');
const userRouter = require('./users/userRouter');
const searchRouter = require('./searchs/searchRouter');
const shoppingCartRouter = require('./payment/shoppingCartRouter');
const { SafeString } = require('handlebars');

const app = express();

port = process.env.PORT || 80

// view engine setup
app.engine('.hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    for : (current, max) =>
    {
      let content = new SafeString('')
      for(var i = 1; i <= max; i ++){
        if(i === parseInt(current)){
          content += new SafeString('<li class="page-item active">' +
            `<a class="page-link" href="/menu/${i}">${i}</a>` +
          '</li>')
        }
        else{
          content += new SafeString('<li class="page-item ">' +
            `<a class="page-link" href="/menu/${i}">${i}</a>` +
          '</li>')
        }
      }
      return content;
    }
  },
  runtimeOptions:{allowProtoPropertiesByDefault:true,
  allowedProtoMethodsByDefault:true}
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.listen(port , () => {
  console.log("Express server listening on port http://localhost:%d in %s mode", port, app.settings.env);
});
//global.userLogined= true
app.use(function (req, res, next) {
  res.locals.login = req.user;
  next();}
);
app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/menu',productRouter);
app.use('/product', detailRouter);
app.use('/order', orderRouter);
app.use('/search', searchRouter);
app.use('/user', userRouter);
app.use('/feedback', feedbackRouter);
app.use('/recycle', recycleRouter);
app.use('/charity', charityRouter);
//app.use('/payment', shoppingCartRouter);

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

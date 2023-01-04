const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars')
const session = require('express-session');
const fileUpload = require('express-fileupload');
const {updateImageUser} = require('./components/users/userRepository');
const crypto = require('crypto');
const hbs = require('hbs');
const flash = require('connect-flash');
const passport = require('./config/passport');
const homeRouter = require('./components/home/homeRouter');
const productRouter = require('./components/products/productRouter');
const detailRouter = require('./components/products/detailRouter');
const usersRouter = require('./components/users/userRouter');
const feedbackRouter = require('./components/feedback/feedbackRouter');
const recycleRouter = require('./components/recycles/recycleRouter');
const charityRouter = require('./components/charities/charityRouter');
// const orderRouter = require('./components/orders/orderRouter');
const userRouter = require('./components/users/userRouter');
const searchRouter = require('./components/searchs/searchRouter');
const shoppingCartRouter = require('./components/payment/shoppingCartRouter');
const authGGRouter = require('./components/authGG/authGGRouter');
const { SafeString } = require('handlebars');

var paginate = require('handlebars-paginate');
 

const app = express();

port = process.env.PORT || 80

// view engine setup
app.engine('.hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    // for : (current, max) =>
    // {
    //   let content = new SafeString('')
    //   for(var i = 1; i <= max; i ++){
    //     if(i === parseInt(current)){
    //       content += new SafeString('<li class="page-item active">' +
    //         `<a class="page-link" href="/menu/${i}">${i}</a>` +
    //       '</li>')
    //     }
    //     else{
    //       content += new SafeString('<li class="page-item ">' +
    //         `<a class="page-link" href="/menu/${i}">${i}</a>` +
    //       '</li>')
    //     }
    //   }
    //   return content;
    // },
    paginate: (paginate)
  },

  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowedProtoMethodsByDefault: true
  }
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(paginate.middleware(10, 50));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use(fileUpload());

app.listen(port, () => {
  console.log("Express server listening on port http://localhost:%d in %s mode", port, app.settings.env);
});
//global.userLogined= true

app.use(function (req, res, next) {
  res.locals.login = req.user;
  next();
}
);
app.use(flash());
app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/menu', productRouter);
app.use('/product', detailRouter);
// app.use('/order', orderRouter);
app.use('/search', searchRouter);
app.use('/user', userRouter);
app.use('/feedback', feedbackRouter);
app.use('/recycle', recycleRouter);
app.use('/charity', charityRouter);
app.use('/shopping-cart', shoppingCartRouter);
app.use('/auth', authGGRouter);
app.post('/upload', (req, res) => {
  if (req.files === null || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.image;
  const token = crypto.randomBytes(20).toString('hex');
  file.name = `${token}${path.extname(file.name)}`;
  file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
      if (err) {
          console.error(err);
          res.render('users/info', { error: 'Cập nhật ảnh thất bại!' });
      }
      const account = req.user.username;
      if (updateImageUser(account, file.name)) {
          res.send(`<script>window.location.href = "http://localhost/user/info"; alert("Cập nhật ảnh thành công!"); </script>`);
      } else {
          res.send(`<script>window.location.href = "http://localhost/user/info"; alert("Cập nhật ảnh thành công!"); </script>`);
      }
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

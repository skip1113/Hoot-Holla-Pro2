if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var app = express();
// var bcrypt = require('bcrypt');
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');
var methodOverride = require('method-override');

//DATABASE===========================================================================================

var BodyParser = require('body-parser');
var CookieParser = require('cookie-parser');

var passportConfig = require('./config/passport-config');
var path = require('path');

// app.use(BodyParser.json());
app.use(express.json());
app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(flash());
app.use(methodOverride('_method'));

passportConfig(passport);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: 'cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);
app.use(passport.initialize());
app.use(passport.session());
var userResponse = function (req, res) {
  res.redirect('/login');
};
app.post('/register', passport.authenticate('local-signup'), userResponse);

app.post('/login', passport.authenticate('local-login'), userResponse);

app.get('/logout', (req, res) => {
  req.logout();
  return res.json({ status: 'success' });
});

// var users = [];

app.get('/', checkAuthenticated, (req, res) => {
  console.log("user",req.user);
  res.redirect('/index.html');
});

app.get('/api/currentuser', checkAuthenticated, (req, res) => {
  console.log("user",req.user.name);
  res.json({name:req.user.name,email:req.user.email});
  // res.send("hello world");
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  console.log('login get route');
  res.sendFile(path.join(__dirname, './public/login.html'));
});

app.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, './public/register.html'));
});
//Getting hoot table


app.post('/register', checkNotAuthenticated, async (req, res) => { });
// app.post('/register', checkNotAuthenticated, async (req, res) => {
//   try {
//     var hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     console.log('user register post route');
//     res.redirect('/login');
//   } catch {
//     res.redirect('/register');
//   }
// });

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  console.log("check authentication",req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  console.log("check not authentication",req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
app.use(express.static('public'));
app.listen(process.env.PORT || 3000);

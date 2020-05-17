if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');
var methodOverride = require('method-override');

//DATABASE===========================================================================================

var session = require('express-session');
var BodyParser = require('body-parser');
var CookieParser = require('cookie-parser');

// var { userResponse, validateUser, secret } = require('./config/config');

var passportConfig = require('./config/passport-config');
var path = require('path');

app.use(BodyParser.json());
app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: true }));
// app.set('view-engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(methodOverride('_method'));

passportConfig(passport);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: 'cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {
      //   httponly, //put here some values
      //   maxAge,
      //   secure,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
var userResponse = function(req, res) {
  console.log('dan, dan', req.body);
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
  console.log(req.user);
  res.redirect('/index.html');
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


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log('user register post route');
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }

});

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

app.use(express.static('public'));
app.listen(3000);

// require("dotenv").config();
// var express = require("express");

// var db = require("./models");

// var app = express();
// var PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static("public"));

// // Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// // Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });

// module.exports = app;

var db       = require('../data/db');
var express  = require('express');
var passport = require('passport');


var router = express.Router();

router.get('/', function(req, res, next) {
   res.render('index', {
       title: 'Node-Oauth 2',
       message: 'Welcome to the cool new service'
   }); 
});

router.get('/login', function(req, res, next) {
   res.render('index/login', {
       title: 'Login'
   }); 
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
  successRedirect: '/profile'
}));

router.get('/logout', function(req, res, next) {
   req.logout();
   req.flash('success', 'Successfully logged out');
   res.redirect('/login');
})

router.get('/signup', function(req, res, next) {
   res.render('index/signup', {
       title: 'Sign Up'
   }); 
});

router.post('/signup', function(req, res, next) {
   db.user.create(req.body, function(err, user) {
      if (err) {
         req.flash('error', err.message);
         return res.redirect('/signup');
      };
      user.id = db.id();
      user.save(function(err) {
         if (err) return next(err);
         req.flash('success', 'Account created. Please log in.');
         res.redirect('/login');
      });
   });
});

module.exports = router;
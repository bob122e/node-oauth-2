var db       = require('../data/db');
var express  = require('express');


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

router.get('/signup', function(req, res, next) {
   res.render('index/signup', {
       title: 'Sign Up'
   }); 
});


router.post('/signup', function(req, res, next) {
   db.user.create(req.body, function(err, user) {
      if (err) return next(err);
      user.id = db.id();
      user.save(function(err) {
         if (err) return next(err);
         res.redirect('/login');
      });
   });
});

module.exports = router;
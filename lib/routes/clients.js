var db       = require('../data/db');
var express  = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  db.client.fetch({user_id: req.user.id}, function(err, data) {
    res.render('clients', {
       title: 'Developer',
       clients: data
   }); 
  });
});

router.get('/new', function(req, res, next) {
  res.render('clients/new', {
    title: 'New Client', 
    client_id: db.id().replace(/-/g, ''),
    secret: Math.random().toString(36).slice(2) + 
            Math.random().toString(36).slice(2) +
            Math.random().toString(36).slice(2)
  })
});

router.post('/new', function(req, res, next) {
  req.body.user_id = req.user.id;
  req.body.scope = req.body.scope ? req.body.scope.toString() : '';
  req.body.grants = "authorization_code,client_credentials";
  req.body.id = db.id();
  
  db.client.create(req.body, function(err, client) {
    if (err) return next(err);
    client.save(function(err) {
      if (err) return next(err);
      req.flash('New Client Created!');
      res.redirect('/clients');
    });
  });
});

module.exports = router;
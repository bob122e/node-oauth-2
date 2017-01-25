var express  = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
   res.render('profile', {
       title: 'Profile',
       user: req.user
   }); 
});

router.post('/', function(req, res, next) {
   Object.assign(req.user, req.body);
   req.user.save(function(err) {
      if (err) next(err);
      req.flash('success', 'User updated');
      res.redirect('/profile');
   });
});

module.exports = router;
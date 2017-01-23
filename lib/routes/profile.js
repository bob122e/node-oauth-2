var express  = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.user);
   res.render('profile', {
       title: 'Profile',
       user: req.user
   }); 
});

module.exports = router;
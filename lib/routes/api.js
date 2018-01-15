var express  = require('express');

var router = express.Router();

router.get('/me', function(req, res, next) {
   if (req.token.scopes.indexOf('profile') == -1) {
      return res.status(401).end();
   }
   
   var u = req.user.toObject();
   delete u.password;
   if (req.token.scopes.indexOf('email') == -1) {
      delete u.email;
   }
   
   res.json({data: u});
});

module.exports = router;
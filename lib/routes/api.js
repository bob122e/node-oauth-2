var express  = require('express');

var router = express.Router();

router.get('/me', function(req, res, next) {
   var u = req.user.toObject();
   delete u.password;
   res.json({data: u});
});

module.exports = router;
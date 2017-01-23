var bcrypt         = require('bcrypt');
var db             = require('../data/db');
var LocalStrategy  = require('passport-local').Strategy;
var passport       = require('passport');


var local = new LocalStrategy(function(username, password, done) {
  db.user.get({email: username}, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, function(err, res) {
      if (err) return done(err);
      if (!res) return done(null, false);
      done(null, user);
    });
  });
});

module.exports.init = function() {
  passport.use('local', local);
  
  passport.serializeUser(function(user, done) {

    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.user.get(id, function(err, user) {
      done(null, user);
    });
  });
}
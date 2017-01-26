var bcrypt         = require('bcrypt');
var db             = require('../data/db');
var LocalStrategy  = require('passport-local').Strategy;
var passport       = require('passport');


var local = new LocalStrategy(function(username, password, done) {
  db.user.get({email: username}, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'User not found' });
    bcrypt.compare(password, user.password, function(err, res) {
      if (err) return done(err);
      if (!res) return done(null, false, { message: 'Invalid password' });
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
    db.user.get(id, done);
  });
}

module.exports.isLoggedIn = function(req, res, next) {
  if (req.user) return next()
  req.flash('error', 'You must log in to access that page');
  res.redirect('/login');
}
var a_     = require('async');
var bcrypt = require('bcrypt');
var db     = require('../db');
var model  = db.rods.model('users');

module.exports = model;

module.exports.create = function(data, callback) {
  var self = this;
  var user;
  
  a_.waterfall([
    function(next) {
      self.get({email: data.email}, next)
    },
    function(u, next) {
      if (u) {
        return next(new Error('Email already registered'));
      }
      next();
    },
    function(next) {
      if (data.password != data.confirm) {
        return next(new Error('Passwords do not match'));
      }
      if (data.password == '') {
        return next(new Error('Password can not be blank'));
      }
      next()
    },
    function(next) {
      delete data.confirm;
      bcrypt.hash(data.password, 10, next);
    },
    function(hash, next) {
      data.password = hash;
      user = new self(data);
      next()
    }
  ], function(err) {
    callback(err, user);
  })
}
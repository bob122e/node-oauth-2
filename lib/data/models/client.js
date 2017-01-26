var a_     = require('async');
var bcrypt = require('bcrypt');
var db     = require('../db');
var model  = db.rods.model('clients');

module.exports = model;

module.exports.create = function(data, callback) {
  var self = this;
  var client;
  
  a_.waterfall([
    function(next) {
      bcrypt.hash(data.secret, 10, next);
    },
    function(hash, next) {
      data.secret = hash;
      client = new self(data);
      next()
    }
  ], function(err) {
    callback(err, client);
  })
}
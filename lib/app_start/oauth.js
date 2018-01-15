var bcrypt = require('bcrypt');
var db     = require('../data/db');
var moment = require('moment');
var oauth  = require('express-oauth-server');

var model = {
  
  getAccessToken: function(token, callback) {
    db.token
      .first()
      .where({access_token: token})
      .populate('user', db.user.first(), x => ['id', x.user_id])
      .populate('client', db.client.first(), x => ['id', x.client_id])
      .exec(function(err, data) {
        if(err) return callback(err);
        callback(err, data.toObject());
      });
  },
  
  saveToken: function(token, client, user, callback) {
    console.log(token.scope);
    var t = new db.token({
      id: db.id(),
      access_token: token.accessToken,
      expires_at: token.accessTokenExpiresAt,
      scope: token.scope.toString(),
      user_id: user.id,
      client_id: client.id
    });


    t.save(function(err, data) {
      if (err) console.log(err);
      data.accessToken = data.access_token;
      data.accessTokenExpiresAt = data.expires_at;
      data.client = data.client_id;
      data.user = data.user_id;
      callback(err, data);
    });
  },
  
  getClient: function(id, secret, callback) {
    db.client.get({client_id: id}, function(err, data) {
      if (err) return callback(err);
      if (!data) return callback(new Error('Client not found.'));
      if (secret) {
        bcrypt.compare(secret, data.secret, function(err, res) {
          if (err) return callback(err);
          if (!res) return callback(new Error('Invalid Password'));
          data.grants = data.grants.split(',');
          console.log(data);
          return callback(null, data.toObject());
          });
      } else {
        return callback(null, data.toObject());
      }
    });
  },
  
  getUserFromClient: function(client, callback) {
    db.user.get(client.user_id, function(err, data) {
      callback(err, data.toObject())
    });
  },
  
  validateScope: function(user, client, scope, callback) {
    var scopes = scope.split(',');
    client.scopes = client.scope.split(',');
    scopes.forEach(function(x) {
      if (client.scopes.indexOf(x) == -1) {
        return callback(new Error('Invalid Scope: ' + x));
      }
    });
    callback(null, scopes);
  }
  
}

module.exports.init = function(app) {
  app.oauth = new oauth({
    model: model
  })
}
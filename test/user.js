var assert = require('assert');
var db     = require('../lib/data/db');

describe('user', function() {
  describe('.create()', function() {
    it('should create a new user', function(done) {
      var data = {
        email: 'test@email.com',
        password: 'password',
        confirm: 'password'
      };
      
      db.user.create(data, function(err, user) {
        assert(!err);
        assert.notEqual(user.password, 'password');
        user.save(function(err) {
          assert(!err);
          done()
        });
        
      });
    });
    it('should fail because email exists', function(done) {
      var data = {
        email: 'test@email.com',
        password: 'password',
        confirm: 'password'
      };
      
      db.user.create(data, function(err) {
        assert(err);
        assert.equal(err.message, 'Email already registered');
        done();
      });
    });
    it('should failed because passwords dont match', function(done) {
      var data = {
        email: 'test2@email.com',
        password: 'password',
        confirm: 'password2'
      };
      
      db.user.create(data, function(err) {
        assert(err);
        assert.equal(err.message, 'Passwords do not match');
        done();
      });
    });
    it('should failed because password can not be blank', function(done) {
      var data = {
        email: 'test2@email.com',
        password: '',
        confirm: ''
      };
      
      db.user.create(data, function(err) {
        assert(err);
        assert.equal(err.message, 'Password can not be blank');
        done();
      });
    });
  });
});
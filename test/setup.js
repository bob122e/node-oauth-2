var db = require('../lib/data/db');
var fs = require('fs');

before(function(done) {
  db.knex.migrate.latest().then(function() {
    done();
  });
});

after(function() {
  fs.unlinkSync('test.sqlite3')
});


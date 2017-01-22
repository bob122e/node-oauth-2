
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.uuid('id').primary();
    t.text('email');
    t.text('password');
    t.text('first_name');
    t.text('last_name');
    t.text('birthdate');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('clients', function(t) {
      t.uuid('id').primary();
      t.text('name');
      t.text('client_id');
      t.text('secret');
      t.text('scope');
      t.text('grants');
      t.text('redirect_uris');
      t.uuid('user_id')
    }),
    knex.schema.createTable('tokens', function(t) {
      t.uuid('id').primary();
      t.text('access_token');
      t.date('expires_at');
      t.text('scope');
      t.uuid('client_id');
      t.uuid('user_id');
    }),
    knex.schema.createTable('auth_codes', function(t) {
      t.uuid('id').primary();
      t.text('authorization_code');
      t.date('expires_at');
      t.text('redirect_uri');
      t.text('scope');
      t.uuid('client_id');
      t.uuid('user_id');
    })]
  )
};

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.dropTableIfExists('clients'),
    knex.schema.dropTableIfExists('tokens'),
    knex.schema.dropTableIfExists('auth_codes')
    ]);
};

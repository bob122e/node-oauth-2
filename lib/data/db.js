var knexfile = require('../../knexfile');
var knex     = require('knex')(knexfile[process.env.NODE_ENV]);
var rods     = require('rods')(knex);
var uuid     = require('uuid');

module.exports.id = uuid.v1;
module.exports.knex = knex;
module.exports.rods = rods;

//MODELS
var user = require('./models/user.js')
var client = require('./models/client.js');
var token = require('./models/token.js');
var auth_code = require('./models/auth_code.js');

module.exports.user = user
module.exports.client = client;
module.exports.token = token;
module.exports.auth_code = auth_code;
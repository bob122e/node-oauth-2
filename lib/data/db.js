var knexfile = require('../../knexfile');
var knex     = require('knex')(knexfile[process.env.NODE_ENV]);
var rods     = require('rods')(knex);
var uuid     = require('uuid');


module.exports.id = uuid.v1;
module.exports.knex = knex;
module.exports.rods = rods;

//MODELS
var user = require('./models/user.js')

module.exports.user = user
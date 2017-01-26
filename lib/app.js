var express = require('express');
var config  = require('./app_start/config');
var errors  = require('./app_start/errors');
var routes  = require('./app_start/routes');
var auth    = require('./app_start/auth');
var api     = require('./app_start/api');

var app = express();

config.init(app);
api.init(app);
routes.init(app);
errors.init(app);

auth.init();

module.exports = app;

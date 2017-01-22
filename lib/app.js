var express = require('express');
var config  = require('./app_start/config');
var errors  = require('./app_start/errors');
var routes  = require('./app_start/routes');

var app = express();

config.init(app);
routes.init(app);
errors.init(app);

module.exports = app;

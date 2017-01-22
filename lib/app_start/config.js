var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var express      = require('express');
var logger       = require('morgan');
var path         = require('path');

exports.init = function(app) {
    
    app.set('views', path.join(__dirname, '../', 'views'));
    app.set('view engine', 'pug');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
}
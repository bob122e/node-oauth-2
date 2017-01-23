var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var express      = require('express');
var logger       = require('morgan');
var path         = require('path');
var db           = require('../data/db');
var session      = require('express-session');
var KnexStore    = require('connect-session-knex')(session);
var flash        = require('connect-flash');
var passport     = require('passport');


exports.init = function(app) {
    
    app.set('views', path.join(__dirname, '../', 'views'));
    app.set('view engine', 'pug');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new KnexStore({ knex: db.knex })
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    
    
}
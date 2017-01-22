1. MVC: create folders `data, routes, views`
2. app startup `app_start`
  * `config.js`: server start up / configuration
  
    ```js
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
    ```
  * `routes.js`: route/controller set up
  
      ```js
      var index = require('../routes/index');

      exports.init = function(app) {
        
        app.use('/', index);
      }
      ```
  * `errors.js`: server error handling
    ```js
      exports.init = function(app) {
          
          app.use(function(err, req, res, next) {
              console.log(err);
              res.status(err.status || 500);
              res.render('errors', {
                  message: err.message
              });
          });
      }
    ```
3. `routes/index.js`: main route
  ```js
  var express  = require('express');
  
  var router = express.Router();
  
  router.get('/', function(req, res, next) {
     res.render('index', {
         title: 'Node-Oauth 2',
         message: 'Welcome to the cool new service'
     }); 
  });
  
  router.get('/login', function(req, res, next) {
     res.render('index/login', {
         title: 'Login'
     }); 
  });
  
  router.get('/signup', function(req, res, next) {
     res.render('index/signup', {
         title: 'Sign Up'
     }); 
  });
  
  module.exports = router;
  ```

4. Views
    * `layout.pug`
      ```
      doctype html
      html
        head
          title= title
          link(rel='stylesheet', href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
        body
          include nav.pug
          .container(style='margin-top:60px')
            block content
      ```
    * `nav.pug`
      ```
      nav.navbar.navbar-default.navbar-fixed-top
        .container
          .navbar-header
            button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#navbar', aria-expanded='false', aria-controls='navbar')
              span.sr-only Toggle navigation
              span.icon-bar
              span.icon-bar
              span.icon-bar
            a.navbar-brand(href='#') Node-OAuth 2
          #navbar.navbar-collapse.collapse
            ul.nav.navbar-nav
              li.active
              li
                a(href='/about') About
              li
                a(href='/contact') Contact
            ul.nav.navbar-nav.navbar-right
              li
                a(href='/login') Login
              li
                a(href='/signup') Sign Up
      ```
    * `index/index.pug`
      ```
      extends ../layout.pug
      
      block content
        .jumbotron
          h1= title
          p= message
          br
          a.btn.btn-lg.btn-primary(href='/login') Sign Up
      ```
    * `index/login.pug`
      ```
      doctype html
      html
        head
          title= title
          link(rel='stylesheet', href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
        body
          .container(class='col-md-4 col-md-offset-4' style='margin-top:60px')
            p: a(href='/')  Home
            .panel.panel-default
              .panel-heading= title
              .panel-body
                form(method='POST')
                  .form-group
                      label Email
                      input.form-control(type='email', autofocus='', required='')
                  .form-group
                      label Password
                      input.form-control(type='password', required='')
                  button.btn.btn-lg.btn-primary.btn-block(type='submit') Login
                  br
                  p Need an account? 
                    a(href='/signup') Sign Up
      ```
    * `index/signup.pug`
      ```
      doctype html
      html
        head
          title= title
          link(rel='stylesheet', href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
        body
          .container(class='col-md-4 col-md-offset-4' style='margin-top:60px')
            p: a(href='/')  Home
            .panel.panel-default
              .panel-heading= title
              .panel-body
                form(method='POST')
                  .form-group
                      label Email
                      input.form-control(type='email', autofocus='', required='')
                  .form-group
                      label Password
                      input.form-control(type='password', required='')
                  .form-group
                      label Confirm Password
                      input.form-control(type='password', required='')
                  button.btn.btn-lg.btn-success.btn-block(type='submit') Sign Up
                  br
                  p Already have an account? 
                    a(href='/login') Login
      ```
    * `errors/index.pug`
      ```
      extends ../layout.pug
  
      
      block content
        h1= message
      ```
5. Update `app.js`
```js
var express = require('express');
var config  = require('./app_start/config');
var errors  = require('./app_start/errors');
var routes  = require('./app_start/routes');

var app = express();

config.init(app);
routes.init(app);
errors.init(app);

module.exports = app;

```
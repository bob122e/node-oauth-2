## Hello World Server

1. create package.json 

    `npm init -y`
2. install first set of dependencies

    `npm install --save express body-parser cookie-parser morgan pug`

3. create lib folder & app.js


4. Basic Hello World Server
    * `lib/app.js`: main server file
    ```js
    var express = require('express');

    var app = express();
    
    app.use('/', function(req, res, next) {
       res.send('Hello World'); 
    });
    
    module.exports = app;
    ```
    
    * `bin/www`: "run" type file
    ```js
    #!/usr/bin/env node

    var app  = require('../lib/app.js');
    var http = require('http');
    
    var server = http.createServer(app);
    
    server.listen(8080);
    ```
    
    * set up npm start: `package.json`
    
    ```json
    "scripts": {
        "start": "node bin/www",
        "test": "echo \"Error: no test specified\" && exit 1"
      }
    ```

5. using nodemon to auto refresh

    `npm install --save-dev nodemon`
    
    `start: nodemon --watch lib --exec node -- bin/www`
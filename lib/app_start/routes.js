var auth  = require('./auth.js');
var index = require('../routes/index');
var profile = require('../routes/profile');
var clients  = require('../routes/clients');

exports.init = function(app) {
    
    app.use('/', index);
    
    
    app.use('/profile', auth.isLoggedIn)
    app.use('/profile', profile)
    app.use('/clients', auth.isLoggedIn);
    app.use('/clients', clients);
}
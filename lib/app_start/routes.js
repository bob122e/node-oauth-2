var index = require('../routes/index');
var profile = require('../routes/profile');

exports.init = function(app) {
    
    app.use('/', index);
    
    app.use('/profile', profile)
}
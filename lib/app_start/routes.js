var index = require('../routes/index');

exports.init = function(app) {
    
    app.use('/', index);
}
var api = require('../routes/api');

module.exports.init = function(app) {
  
  
  app.use('/api', api)
}
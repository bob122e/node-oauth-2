var api = require('../routes/api');

module.exports.init = function(app) {
  app.post('/api/token', app.oauth.token())
  
  app.use('/api', app.oauth.authenticate())
  
  app.use('/api', function(req, res, next) {
    var oauth = res.locals.oauth;
    req.token = oauth.token;
    req.token.scopes = req.token.scope.split(',');
    req.user = oauth.token.user;
    req.client = oauth.token.client;
    next();
  });
  
  app.use('/api', api)
}
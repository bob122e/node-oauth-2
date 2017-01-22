

exports.init = function(app) {
    
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.render('errors', {
            message: err.message
        });
    });
}
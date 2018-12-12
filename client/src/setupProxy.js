const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    // values provided here are what forward along any Axios requests to the target URL provided
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/*', { target: 'http://localhost:5000' }));
}

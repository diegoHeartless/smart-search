const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log('test')
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3080',
            changeOrigin: true,
        })
    );
};
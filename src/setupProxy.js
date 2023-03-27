const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ozon',
        createProxyMiddleware({
            pathRewrite: function (path) {
                console.log(path)
                return path.replace('/ozon', '/')
            },
            onProxyRes: function (proxyReq, req, rsp) {
                 proxyReq.headers['origin'] = 'http://mnnvh.fvds.ru';
                   proxyReq.headers['referer'] = 'http://mnnvh.fvds.ru/';
            },
            target: 'http://www.ozon.ru',
            changeOrigin: true,
        })
    );
    app.listen(80)
};
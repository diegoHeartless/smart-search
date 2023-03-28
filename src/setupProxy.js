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
                 console.log(proxyReq)
                 proxyReq.headers['origin'] = 'http://mnnvh.fvds.ru';
                 proxyReq.headers['referer'] = 'http://mnnvh.fvds.ru/';
            },
            target: 'http://www.ozon.ru',
            changeOrigin: true,
            externalResolver: true,
            bodyParser: false
        })
    );
    app.listen(80)
};
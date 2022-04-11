const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(
        ['/api', '/socket.io'],
        {
            target: 'http://localhost:4000',
            changeOrigin: true,
            ws: true,
            router: {
              '/socket.io': 'ws://nginx:80'
            }
        }
    )
  );
};

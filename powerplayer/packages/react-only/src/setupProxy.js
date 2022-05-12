const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'http://localhost:3010',
  pathRewrite: {
    '^/api/': '/'
  },
  changeOrigin: true,

}
console.log('I AM A PROXY')
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxy)
  );
};

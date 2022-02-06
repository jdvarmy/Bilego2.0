const { createProxyMiddleware } = require('http-proxy-middleware');

const BACKEND = process.env.REACT_APP_NEST_APP_API_ROOT;

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: BACKEND,
      changeOrigin: true,
    }),
  );
};

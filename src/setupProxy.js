const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Client API 代理 - 必须放在 /api 之前
  app.use(
    '/api/client',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8081/client',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log('[Proxy] Client API:', req.method, req.url, '→ http://127.0.0.1:8081');
      },
      onError: (err, req, res) => {
        console.error('[Proxy Error]', err);
        res.status(500).json({
          code: 500,
          message: '代理请求失败，请确保后端服务正在运行',
        });
      },
    })
  );

  // 其他 API 代理
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8888',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log('[Proxy] API:', req.method, req.url, '→ http://127.0.0.1:8888');
      },
      onError: (err, req, res) => {
        console.error('[Proxy Error]', err);
        res.status(500).json({
          code: 500,
          message: '代理请求失败',
        });
      },
    })
  );
};

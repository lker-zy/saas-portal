import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Client API 代理 - 必须放在 /api 之前
      '/api/client': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/client/, '/client'),
      },
      // 其他 API 代理（cluster, template, order, platform 等）
      '/api': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
});

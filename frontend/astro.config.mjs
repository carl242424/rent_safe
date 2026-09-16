// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.PUBLIC_API_URL || 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  },
});

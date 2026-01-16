import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(async () => ({
  root: 'src',
  publicDir: '../public',

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },

  define: {
    OS_PLATFORM: `"${process.platform}"`,
  },
}));

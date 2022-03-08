import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3030
  },
  preview: {
    port: 8080
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@/pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@/hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@/context': fileURLToPath(new URL('./src/context', import.meta.url)),
      '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@/assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@/styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@/locales': fileURLToPath(new URL('./src/locales', import.meta.url)),
    },
  },
});

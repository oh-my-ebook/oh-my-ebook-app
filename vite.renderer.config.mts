import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@services': path.resolve(
        import.meta.dirname,
        mode === 'web' ? 'web/services.ts' : 'electron/services.ts',
      ),
    },
  },
  ...(mode === 'web' ? { build: { outDir: 'dist/web' } } : {}),
}));

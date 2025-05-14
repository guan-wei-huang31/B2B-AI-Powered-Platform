import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envDir: '../../', // Set the environment directory to the root of the pnpm workspace
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

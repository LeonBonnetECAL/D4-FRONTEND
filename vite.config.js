// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // ✅ relative paths so assets work anywhere (Firebase, GitHub Pages, etc.)
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects_page.html'),
        project: resolve(__dirname, 'project_page.html'),
        bureau: resolve(__dirname, 'bureau_page.html'),
        contact: resolve(__dirname, 'contact_page.html'),
      }
    }
  }
});

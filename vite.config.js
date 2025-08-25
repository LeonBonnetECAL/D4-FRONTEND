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
        projects: resolve(__dirname, 'projets.html'),
        project: resolve(__dirname, 'projet.html'),
        bureau: resolve(__dirname, 'bureau.html'),
        contact: resolve(__dirname, 'contact.html'),
      }
    }
  }
});

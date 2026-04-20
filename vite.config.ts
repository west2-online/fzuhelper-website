import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { resolve } from 'path';

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src'),
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
});

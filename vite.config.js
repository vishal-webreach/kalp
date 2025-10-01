// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import compression from 'vite-plugin-compression'; // For Brotli or Gzip compression (optional)


export default defineConfig({
  plugins: [
    tailwindcss(),

    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // only compress files > 10kb
      deleteOriginFile: false // keep original files
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
  ],

  // 👇 base path for deployment (change if deploying in a subfolder)
  base: '/kalp/',

  // 👇 project root (keep this '.' if index.html is in root)
  root: '.',

  // ✅ Alias setup for simpler imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@js': path.resolve(__dirname, 'src/js'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@images': path.resolve(__dirname, 'src/images')
    },
  },

  // ✅ Dev server configuration
  server: {
    port: 3000,         // default is 5173, use 3000 for familiarity
    open: true,         // open browser automatically
    strictPort: true,   // fail if port is taken
  },

  // ✅ Build configuration for static site
  build: {
    outDir: 'dist',             // build output directory
    emptyOutDir: true,          // clear /dist before build
    sourcemap: true,           // no .map files needed for static
    minify: 'esbuild',          // fast minifier
    assetsDir: 'assets',        // static assets go here (css, js, images)
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        knowledge_hub: path.resolve(__dirname, 'knowledge-hub.html')
      },
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        cssFileNames: 'assets/[name].[hash].css'
      },
    },
  },

  // ✅ Environment variables prefix
  envPrefix: 'VITE_', // only load .env vars starting with VITE_

  // ✅ Define production mode (optional)
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

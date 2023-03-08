import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile"

import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile({removeViteModuleLoader: true})],
  // server: {
  //   proxy :{
  //     '/api': {
  //       target: 'http://localhost:8000/api',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  }
});

/// <reference types="vite/client" />



declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue/types/vue' {
  import {Router} from 'vue-router'
  interface Vue {
    $router: Router
  }
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";

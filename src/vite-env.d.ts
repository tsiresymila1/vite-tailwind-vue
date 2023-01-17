/// <reference types="vite/client" />



declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
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

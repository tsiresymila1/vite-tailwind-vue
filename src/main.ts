import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import VueSocketIO from "vue-3-socket.io";
import VueClickAway from "vue3-click-away";
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'



// import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js"
import {io} from 'socket.io-client'

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Toast from "vue-toastification";
import { OhVueIcon as VIcon, addIcons } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";
import * as BIcons from "oh-vue-icons/icons/bi";
import VtInput from "./components/common/Input.vue";
import VtSelect from "./components/common/Select.vue";
import VtButton from "./components/common/Button.vue";
import VtDropdown from "./components/common/DropDown.vue";


import "@vuepic/vue-datepicker/dist/main.css";
import "vue-toastification/dist/index.css";
import "./style.css";

import App from "./App.vue";
import { routes } from "./route";

const app = createApp(App,{
  render(h) {
    h(app)
  },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

addIcons(...Object.values({ ...FaIcons }), ...Object.values({ ...BIcons }));
// @ts-ignore
app.use(new VueSocketIO({
  debug: true,
  // @ts-ignore
  connection:io('http://localhost:8888',{
    transports: ["polling", "websocket"],
    reconnection: true,
    auth: {
      is_admin : true
    }
  }),
}))

app.use(pinia);
app.use(router);
app.use(VueClickAway) 
app.use(VueVirtualScroller)
app.component('RecycleScroller', VueVirtualScroller.RecycleScroller)
app.component("v-icon", VIcon);
app.component("vt-input", VtInput);
app.component("vt-button", VtButton);
app.component("vt-select", VtSelect);
app.component("vt-dropdown", VtDropdown);
app.use(Toast, {
  hideProgressBar: true,
  transition: "Vue-Toastification__fade",
  maxToasts: 1,
  newestOnTop: true,
  timeout: 0,
  toastClassName: "toast-app",
  position: "top-right",
  containerClassName: "toast-container-app",
  bodyClassName: "toast-body-app",
});

router.isReady().then(() => app.mount("#app"));


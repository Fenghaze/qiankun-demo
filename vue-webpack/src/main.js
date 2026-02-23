import { createApp } from "vue";
import App from "./App.vue";
import "./public-path.js";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import { userInfoStore } from "@/stores/userInfo";
const pinia = createPinia();
let appInstance = null;

const render = (props = {}) => {
  const { container } = props;
  appInstance = createApp(App);
  appInstance.use(router);
  appInstance.use(pinia);
  appInstance.use(ElementPlus);
  appInstance.mount(container ? container.querySelector("#app") : "#app");
  // 手动将 ElementPlus 挂载到全局，供子应用使用
  window.ElementPlus = ElementPlus;
};

export async function bootstrap() {
  console.log("main-web bootstrap");
}

export async function mount(props) {
  // 监听状态变化
  props.onGlobalStateChange((state, prev) => {
    console.log("子应用监听到主应用状态变化", state, prev);
    const userInfo = userInfoStore();
    userInfo.setUserInfo(state);
  });
  render(props);
}

export async function unmount() {
  console.log("main-web unmount");
  if (appInstance) {
    appInstance.unmount();
    appInstance._container.innerHTML = "";
    appInstance = null;
  }
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

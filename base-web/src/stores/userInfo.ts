import { defineStore } from "pinia";
import { initGlobalState } from "qiankun";
const actions = initGlobalState({});
export const userInfoStore = defineStore("userInfo", {
  state: () => ({
    user: {
      theme: Number(window.localStorage.getItem("theme")) || 0,
    },
  }),
  actions: {
    setUserInfo(data: {}) {
      this.user = Object.assign(this.user, data);
      window.localStorage.setItem("theme", String(this.user.theme));
    },
    updateTheme(val: number) {
      this.user.theme = val;
      window.localStorage.setItem("theme", String(val));
      actions.setGlobalState(this.user); // 发送新主题变化到子应用
      this.changeTheme(val)
    },
    changeTheme(themeVal: number) {
      const themeObj : any = {
        0: "blue",
        1: "black",
      };
      const root = document.documentElement;
      root.setAttribute("theme", themeObj[themeVal]);
    },
  },
});

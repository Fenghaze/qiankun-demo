import { defineStore } from 'pinia';

export const userInfoStore = defineStore("userInfo", {
  state: () => ({
    user: {},
  }),
  actions: {
    setUserInfo(data) {
      this.user = data;
    },
  },
});

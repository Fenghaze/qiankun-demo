<template>
  <div id="app">
    <router-link to="/vue-webpack">子应用Vue+webpack</router-link>
    |
    <router-link to="/vue-vite">子应用Vue+vite</router-link>
    <router-view></router-view>
    <el-button
      :type="curTheme === 0 ? 'primary' : 'default'"
      @click="changeTheme(0)"
      >白色主题</el-button
    >
    <el-button
      :type="curTheme === 1 ? 'primary' : 'default'"
      @click="changeTheme(1)"
      >黑色主题</el-button
    >
  </div>
  <!-- qiankun子应用挂载DOM -->
  <div id="sub-container"></div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { userInfoStore } from "./stores/userInfo";
const userInfoData = userInfoStore();
const curTheme = computed({
  get() {
    return userInfoData.user.theme;
  },
  set(val) {
    userInfoData.updateTheme(val);
  },
});
function initApp() {
  changeTheme(curTheme.value);
}
function changeTheme(themeVal) {
  curTheme.value = themeVal;
}
initApp();
</script>

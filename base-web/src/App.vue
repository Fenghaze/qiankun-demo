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
    <el-button @click="changeFontSize(fontSize + 1)">增大字体</el-button>
    <el-button @click="changeFontSize(fontSize - 1)">减小字体</el-button>
    <div class="test-rem">
      <p>这是一个测试rem单位的文本，当前字体大小：{{ fontSize }}px</p>
    </div>
  </div>
  <!-- qiankun子应用挂载DOM -->
  <div id="sub-container"></div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { userInfoStore } from "./stores/userInfo";
const userInfoData = userInfoStore();
const fontSize = ref(18);
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
function changeFontSize(val) {
  const root = document.documentElement;
  root.style.setProperty(`--font-size`, `${val}px`);
  fontSize.value = val;
}
initApp();
</script>

<style>
* {
  font-size: var(--font-size);
}
.test-rem {
  width: 10rem;
  height: 10rem;
}
</style>

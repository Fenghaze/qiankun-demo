<template>
  <div id="app">
    <h1>子应用1：vue+webpack打包的项目</h1>
    <router-link to="/vue-webpack/home">首页</router-link>
    |
    <router-link to="/vue-webpack/about">关于</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToAbout() {
      this.$router.push('/vue-webpack/about');
    },
  },
};
</script>
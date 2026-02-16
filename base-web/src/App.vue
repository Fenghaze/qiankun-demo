<template>
  <div id="app">
    <router-link to="/vue-webpack">子应用Vue+webpack</router-link>
    |
    <router-link to="/vue-vite">子应用Vue+vite</router-link>
    <router-view></router-view>
  </div>
  <!-- qiankun子应用挂载DOM -->
  <div id="sub-container"></div>
</template>
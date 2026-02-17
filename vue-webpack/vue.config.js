const { defineConfig } = require("@vue/cli-service");
const { name } = require("./package");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/static/market/cards": {
        target: "http://localhost:8082",
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
});

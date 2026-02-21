const { defineConfig } = require("@vue/cli-service");
const path = require("path");

// 判断当前是否为开发服务器启动
const isDevServer =
  process.env.NODE_ENV === "development" &&
  process.argv.some((arg) => arg.includes("serve"));

// 卡片列表：每个卡片一个入口
const cardEntries = {
  "user-info": "./src/cards/userinfo-card/index.js",
  "list-card": "./src/cards/list-card/index.js",
};

const es6Config = {
  output: isDevServer
    ? undefined
    : {
        filename: "[name]/index.js", // 输出到对应卡片目录下，例如 user-info/index.js
        libraryTarget: "module", // 输出 ES 模块
        module: true, // 启用模块输出
        chunkFormat: "module",
      },
  experiments: {
    outputModule: true, // 必须开启
  },
};

const umdConfig = {
  output: isDevServer
    ? undefined
    : {
        filename: "[name]/index.js", // 输出到对应卡片目录下，例如 user-info/index.js
        library: "Card-[name]", // UMD 模块名称
        libraryTarget: "umd", // 打包为 UMD
        umdNamedDefine: true,
        globalObject: "this",
      },
};

module.exports = defineConfig({
  publicPath: "/static/market/cards/", // 构建后资源的基础路径
  devServer: {
    port: 8082,
    open: true,
    static: {
      directory: path.join(__dirname, "dist"), // 提供 dist 静态资源
      publicPath: "/static/market/cards",
      watch: true,
    },
  },
  outputDir: "dist", // 输出目录
  assetsDir: "", // 静态资源直接输出到卡片目录下
  productionSourceMap: false, // 生产环境关闭 sourcemap
  // webpack配置
  configureWebpack: {
    entry: cardEntries, // 多入口
    optimization: isDevServer
      ? {}
      : {
          splitChunks: false, // 不需要代码分割，保持每个卡片独立
        },
    ...es6Config,
  },
  chainWebpack(config) {
    if (!isDevServer) {
      // 移除 HTML 插件，因为我们不需要为每个卡片生成 HTML
      config.entryPoints.clear();
      Object.keys(cardEntries).forEach((key) => {
        config.entry(key).add(cardEntries[key]);
      });
      config.plugins.delete("html");
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
    } else {
      // 开发环境：清除默认入口，添加测试入口
      config.entryPoints.clear();
      config.entry("main").add("./src/main.js");
      config.plugin("html").tap((args) => {
        args[0].template = path.resolve(__dirname, "public/index.html");
        args[0].title = "卡片市场 - 测试入口";
        return args;
      });
    }
  },
  css: {
    extract: false,
  },
});

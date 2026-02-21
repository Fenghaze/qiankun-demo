import { defineStore } from "pinia";

// 模拟接口函数
const mockFetchCardCatalog = () => {
  return Promise.resolve({
    data: [
      {
        id: "user-info",
        name: "用户信息",
        icon: "👤",
        entry: "/static/market/cards/user-info/index.js",
        width: 4,
        minWidth: 2,
        maxWidth: 8,
        height: 2,
        minHeight: 1,
        maxHeight: 4,
        defaultConfig: { showAvatar: true },
      },
      {
        id: "list-card",
        name: "待办列表",
        icon: "📋",
        entry: "/static/market/cards/list-card/index.js",
        width: 4,
        minWidth: 2,
        maxWidth: 8,
        height: 2,
        minHeight: 1,
        maxHeight: 4,
        defaultConfig: { items: ["任务一", "任务二", "任务三"] },
      },
    ],
  });
};

// 加载脚本辅助函数
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      // 约定卡片将自身挂载到 window[`Card-${cardId}`]（如 Card_user_info）
      // 这里简单处理：假设脚本执行后会有一个全局变量 CardExports，但为了通用，我们使用约定
      // 实际上需要根据 library 名称获取
      // 我们采用一种更通用的方式：在卡片构建时配置 library: 'Card_[name]'，name 中划线转下划线
      const moduleName = `Card-${url.split("/").slice(-2, -1)[0]}`;
      const mod = window[moduleName];
      resolve(mod?.default || mod);
      delete window[moduleName];
      script.remove();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function loadStyle(url) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => {
      resolve();
    };
    link.onerror = (err) => {
      reject(err);
    };
    document.head.appendChild(link);
  });
}

export const useCardStore = defineStore("card", {
  state: () => ({
    catalog: [],
    loadedModules: new Map(),
    loading: new Set(),
    errors: new Map(),
  }),
  actions: {
    async loadCatalog() {
      const res = await mockFetchCardCatalog();
      this.catalog = res.data;
    },
    async loadUmdModule(cardMeta, cardId) {
      // 使用script加载umd模块
      const module = await loadScript(cardMeta.entry);
      this.loadedModules.set(cardId, module);
      this.errors.delete(cardId);
      return module;
    },
    async loadES6Module(cardMeta, cardId) {
      // 使用 import() 动态加载 ES 模块，跳过 Webpack 处理
      const module = await import(/* webpackIgnore: true */ cardMeta.entry);
      // ES 模块默认导出即为组件
      const component = module.default || module;
      this.loadedModules.set(cardId, component);
      this.errors.delete(cardId);
      return component;
    },
    async loadCard(cardId) {
      // 如果已加载，直接返回缓存
      if (this.loadedModules.has(cardId)) return this.loadedModules.get(cardId);
      if (this.loading.has(cardId)) {
        return new Promise((resolve) => {
          const unwatch = this.$subscribe((mutation, state) => {
            if (state.loadedModules.has(cardId)) {
              unwatch();
              resolve(state.loadedModules.get(cardId));
            }
          });
        });
      }

      const cardMeta = this.catalog.find((c) => c.id === cardId);
      if (!cardMeta) throw new Error(`Card ${cardId} not found`);

      this.loading.add(cardId);

      try {
        const component = await this.loadES6Module(cardMeta, cardId);
        return component
      } catch (err) {
        this.errors.set(cardId, err);
        throw err;
      } finally {
        this.loading.delete(cardId);
      }
    },
  },
});

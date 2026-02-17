import { defineStore } from 'pinia';
import { useCardStore } from '@/stores/card';

// 模拟接口
const mockFetchLayout = () => {
  // 从 localStorage 读取或返回默认布局
  const saved = localStorage.getItem('dashboard_layout');
  if (saved) {
    return Promise.resolve({ data: JSON.parse(saved) });
  }
  // 默认布局：两个卡片
  return Promise.resolve({
    data: {
      cards: [
        { i: 'layout-1', id: 'layout-1', type: 'user-info', x: 0, y: 0, w: 4, h: 2, config: { showAvatar: true } },
        { i: 'layout-2', id: 'layout-2', type: 'list-card', x: 4, y: 0, w: 4, h: 2, config: { items: ['任务一', '任务二', '任务三'] } }
      ]
    }
  });
};

const mockSaveLayout = (layout) => {
  localStorage.setItem('dashboard_layout', JSON.stringify(layout));
  return Promise.resolve({ code: 0 });
};

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    cards: [],        // 布局数据：{ id, type, x, y, w, h, config }
    editing: false,
    loading: false
  }),
  actions: {
    async fetchLayout() {
      this.loading = true;
      try {
        const res = await mockFetchLayout();
        this.cards = res.data.cards || [];
      } finally {
        this.loading = false;
      }
    },
    async saveLayout() {
      await mockSaveLayout({ cards: this.cards });
    },
    addCard(type) {
      // 查找卡片元数据获取默认宽高
      const cardStore = useCardStore();
      const meta = cardStore.catalog.find(c => c.id === type);
      if (!meta) return;
      const newCard = {
        id: `card-${Date.now()}`,
        i: `card-${Date.now()}`,
        x: 0,
        y: this.cards.length, // 简单放在最下方
        w: meta.width || 4,
        h: 2,                 // 默认高度2行（可根据实际调整）
        config: meta.defaultConfig || {}
      };
      this.cards.push(newCard);
    },
    removeCard(cardId) {
      this.cards = this.cards.filter(c => c.id !== cardId);
    },
    updateCard(cardId, updates) {
      const index = this.cards.findIndex(c => c.id === cardId);
      if (index !== -1) {
        this.cards[index] = { ...this.cards[index], ...updates };
      }
    },
    toggleEditing() {
      this.editing = !this.editing;
    }
  }
});
<template>
  <div class="home">
    <div class="toolbar">
      <el-button type="primary" @click="toggleEdit">
        {{ layoutStore.editing ? "完成编辑" : "编辑布局" }}
      </el-button>
      <el-button v-if="layoutStore.editing" @click="saveLayout"
        >保存布局</el-button
      >
      <el-button v-if="layoutStore.editing" @click="addSampleCard"
        >添加示例卡片</el-button
      >
    </div>

    <div class="dashboard-container">
      <grid-layout
        v-model:layout="layoutCards"
        :col-num="12"
        :row-height="100"
        :is-draggable="layoutStore.editing"
        :is-resizable="layoutStore.editing"
        :vertical-compact="true"
        :use-css-transforms="true"
        @layout-updated="layoutUpdated"
      >
        <grid-item
          v-for="item in layoutCards"
          :key="item.id"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.id"
          :min-w="getMinW(item.type)"
          :max-w="getMaxW(item.type)"
          :min-h="1"
          :max-h="4"
          :drag-allow-from="'.drag-handle'"
          :resize-allow-from="'.resize-handle'"
          @resize="onResize"
          @move="onMove"
        >
          <div class="card-container" :class="{ editing: layoutStore.editing }">
            <div v-if="layoutStore.editing" class="card-controls">
              <span class="drag-handle">⣿</span>
              <span class="resize-handle">↘️</span>
              <el-button
                type="danger"
                size="small"
                @click="removeCard(item.id)"
              >
                删除
              </el-button>
            </div>
            <CardWrapper :card-id="item.type" :card-config="item.config" />
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { GridLayout, GridItem } from "vue-grid-layout-v3";
import { useCardStore } from "@/stores/card";
import { useLayoutStore } from "@/stores/layout";
import CardWrapper from "@/components/CardWrapper.vue";
import { ElMessage } from "element-plus";

export default {
  name: "HomeView",
  components: {
    GridLayout,
    GridItem,
    CardWrapper,
  },
  setup() {
    const cardStore = useCardStore();
    const layoutStore = useLayoutStore();

    // 将 layoutStore.cards 转换为 grid-layout 所需的格式
    const layoutCards = computed({
      get: () => layoutStore.cards,
      set: (val) => {
        layoutStore.cards = val;
      },
    });

    // 初始化
    onMounted(async () => {
      await cardStore.loadCatalog();
      await layoutStore.fetchLayout();
    });

    const toggleEdit = () => {
      layoutStore.toggleEditing();
    };

    const saveLayout = async () => {
      await layoutStore.saveLayout();
      ElMessage.success("布局已保存");
    };

    const addSampleCard = () => {
      // 随机选择一种卡片类型
      const types = cardStore.catalog.map((c) => c.id);
      if (types.length === 0) return;
      const randomType = types[Math.floor(Math.random() * types.length)];
      layoutStore.addCard(randomType);
    };

    const removeCard = (cardId) => {
      layoutStore.removeCard(cardId);
    };

    // 获取卡片最小宽度（从元数据）
    const getMinW = (type) => {
      const meta = cardStore.catalog.find((c) => c.id === type);
      return meta?.minWidth || 2;
    };

    const getMaxW = (type) => {
      const meta = cardStore.catalog.find((c) => c.id === type);
      return meta?.maxWidth || 12;
    };

    const onResize = (i, newH, newW, newHPx, newWPx) => {
      // 可以在这里同步更新 store 中的尺寸，但 grid-layout 已双向绑定
      // 不需要额外操作
    };

    const onMove = (i, newX, newY) => {
      // 同样不需要额外操作
    };

    const layoutUpdated = (newLayout) => {
      // 当布局变化时，更新 store 中的顺序（但 grid-layout 已自动更新 layoutCards）
      // 可以做一些额外处理
    };

    return {
      layoutStore,
      layoutCards,
      toggleEdit,
      saveLayout,
      addSampleCard,
      removeCard,
      getMinW,
      getMaxW,
      onResize,
      onMove,
      layoutUpdated,
    };
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  margin-bottom: 20px;
}

.dashboard-container {
  flex: 1;
  overflow-y: auto;
}

.card-container {
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.card-container.editing {
  border: 2px dashed #409eff;
}

.card-controls {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 10;
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 4px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.drag-handle {
  cursor: move;
  font-size: 16px;
  padding: 0 4px;
}

.resize-handle {
  cursor: se-resize;
  font-size: 16px;
  padding: 0 4px;
}
</style>

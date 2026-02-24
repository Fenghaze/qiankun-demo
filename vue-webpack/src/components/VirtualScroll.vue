<template>
  <div ref="container" class="virtual-scroll-container" @scroll="handleScroll">
    <!-- 占位高度（模拟总高度） -->
    <div class="list-placeholder" :style="{ height: totalHeight + 'px' }"></div>

    <!-- 可视区域内容（通过transform偏移） -->
    <div
      class="visible-content"
      :style="{ transform: `translateY(${scrollTopOffset}px)` }"
    >
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// 静态高度配置
const itemHeight = 50; // 所有项高度固定
const itemCount = 10000;
const buffer = 10; // 预渲染缓冲区

// 生成示例数据
const data = Array.from({ length: itemCount }, (_, i) => ({
  id: i,
  content: `静态项 ${i + 1}`,
}));

// DOM引用
const container = ref(null);
const scrollTopOffset = ref(0);
const visibleItems = ref([]);

// 总高度（所有项高度之和）
const totalHeight = computed(() => itemCount * itemHeight);

// 计算可见区域
const calculateVisibleItems = () => {
  const containerHeight = container.value?.clientHeight || 0;

  // 计算可视区域能显示的项数
  const visibleCount = Math.ceil(containerHeight / itemHeight) + buffer;

  // 计算当前滚动位置对应的起始索引
  const scrollTop = container.value?.scrollTop || 0;
  const startIndex = Math.floor(scrollTop / itemHeight);

  // 获取可见数据
  visibleItems.value = data.slice(startIndex, startIndex + visibleCount);

  // 计算偏移量（用于transform）
  scrollTopOffset.value = startIndex * itemHeight;
};

// 滚动处理
const handleScroll = () => {
  calculateVisibleItems();
};

// 初始化
onMounted(() => {
  calculateVisibleItems();
});
</script>

<style scoped>
.virtual-scroll-container {
  height: 500px;
  overflow: auto;
  position: relative;
  border: 1px solid #ccc;
  background: #f5f5f5;
}

.list-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.visible-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.list-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  background: white;
  transition: background 0.2s;
}

.list-item:hover {
  background: #f0f0f0;
}
</style>

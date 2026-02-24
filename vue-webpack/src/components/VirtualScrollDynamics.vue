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
        :style="{ height: itemHeightMap[item.id] + 'px' }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

// 生成示例数据（高度随机）
const data = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  content: `动态项 ${i + 1}`,
  height: Math.floor(Math.random() * 80) + 30, // 随机高度(30-110px)
}));

// 存储每个项的实际高度
const itemHeightMap = ref({});
for (let i = 0; i < data.length; i++) {
  itemHeightMap.value[i] = data[i].height;
}

// DOM引用
const container = ref(null);
const scrollTopOffset = ref(0);
const visibleItems = ref([]);

// 总高度（所有项高度之和）
const totalHeight = computed(() => {
  return Object.values(itemHeightMap.value).reduce((sum, h) => sum + h, 0);
});

// 计算可见区域
const calculateVisibleItems = () => {
  // 确保容器高度有效
  const containerHeight = container.value?.clientHeight || 0;
  if (containerHeight === 0) return;
  const scrollTop = container.value?.scrollTop || 0;

  // 通过累计高度找到起始索引
  let cumulativeHeight = 0;
  let startIndex = 0;

  // 修正1：正确计算起始索引
  // 我们要找的是第一个使得 cumulativeHeight + itemHeight >= scrollTop 的索引
  for (let i = 0; i < data.length; i++) {
    // 如果当前累计高度 + 当前项高度 > scrollTop，则当前项开始可见
    if (cumulativeHeight + itemHeightMap.value[i] >= scrollTop) {
      startIndex = i;
      break;
    }
    cumulativeHeight += itemHeightMap.value[i];
  }

  // 修正2：计算偏移量（正确值 = cumulativeHeight）
  scrollTopOffset.value = cumulativeHeight;

  // 计算结束索引
  let endIndex = startIndex;
  let visibleHeight = 0;

  // 从startIndex开始，直到可见高度超过容器高度
  while (endIndex < data.length && visibleHeight < containerHeight) {
    visibleHeight += itemHeightMap.value[endIndex];
    endIndex++;
  }

  // 更新可见项
  visibleItems.value = data.slice(startIndex, endIndex);
};

// 滚动处理
const handleScroll = () => {
  calculateVisibleItems();
};

// 初始化：使用 nextTick 确保DOM渲染完成
onMounted(() => {
  nextTick(() => {
    calculateVisibleItems();
  });
});
</script>

<style scoped>
.virtual-scroll-container {
  height: 500px;
  overflow: auto;
  position: relative;
  border: 1px solid #ccc;
  background: #f5f5f5;
  box-sizing: border-box;
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
  overflow: hidden;
  transform: translateZ(0); /* 确保GPU加速 */
}

.list-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  background: white;
  transition: background 0.2s;
  white-space: nowrap;
  overflow: hidden;
}

.list-item:hover {
  background: #f0f0f0;
}
</style>

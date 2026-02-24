<template>
  <div>
    <!-- 骨架屏容器，动画显示待加载的大型内容 -->
    <div class="skeleton" id="skeleton">
      <!-- 顶部标题 -->
      <div class="skeleton-header"></div>

      <!-- 产品卡片 -->
      <div class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-price"></div>
      </div>

      <!-- 产品列表 -->
      <div class="skeleton-list">
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
      </div>
    </div>
    <div id="content" class="content">123</div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
// 显示骨架屏
function showSkeleton() {
  document.getElementById("content").style.display = "none";
  document.getElementById("skeleton").style.display = "block";
}

// 隐藏骨架屏，显示真实内容
function hideSkeleton() {
  document.getElementById("skeleton").style.display = "none";
  document.getElementById("content").style.display = "block";
}
onMounted(() => {
  showSkeleton();
  setTimeout(() => {
    hideSkeleton();
  }, 2000);
});
</script>
<style lang="scss" scoped>
.skeleton {
  padding: 20px;
}

.skeleton-header {
  width: 100%;
  height: 40px;
  background: #e0e0e0;
  margin-bottom: 20px;
  border-radius: 4px;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 15px;
}

.skeleton-title {
  width: 70%;
  height: 20px;
  background: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 4px;
}

.skeleton-price {
  width: 40%;
  height: 24px;
  background: #e0e0e0;
  border-radius: 4px;
}

.skeleton-item {
  width: 100%;
  height: 120px;
  background: #e0e0e0;
  margin-bottom: 15px;
  border-radius: 4px;
}

/* 添加脉动动画 */
@keyframes pulse {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

.skeleton-header,
.skeleton-image,
.skeleton-title,
.skeleton-price,
.skeleton-item {
  animation: pulse 2s infinite;
}
</style>

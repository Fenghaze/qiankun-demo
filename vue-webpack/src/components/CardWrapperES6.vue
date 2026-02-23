<template>
  <div></div>
</template>
<script lang="jsx">
import { ref, defineAsyncComponent, computed } from "vue";
import { useCardStore } from "@/stores/card";

export default {
  name: "CardWrapperES6",
  props: {
    cardId: { type: String, required: true },
    cardConfig: { type: Object, default: () => ({}) },
  },
  setup(props) {
    const cardStore = useCardStore();

    // 获取卡片元数据中的默认配置
    const meta = computed(() =>
      cardStore.catalog.find((c) => c.id === props.cardId),
    );

    // 创建异步组件
    const AsyncCard = defineAsyncComponent({
      loader: () => cardStore.loadCard(props.cardId),
      loadingComponent: () => <el-skeleton rows={4} animated />,
      errorComponent: () => (
        <el-alert type="error" title={`卡片加载失败: ${props.cardId}`} />
      ),
      delay: 200,
      timeout: 10000,
    });

    return () => (
      <div class="card-wrapper">
        <AsyncCard
          config={{ ...meta.value?.defaultConfig, ...props.cardConfig }}
        />
      </div>
    );
  },
};
</script>

<style scoped>
.card-wrapper {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>

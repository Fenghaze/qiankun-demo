<template>
    <div class="card-wrapper">
        <el-skeleton v-if="loading" :rows="4" animated />
        <el-alert v-else-if="error" type="error" :title="`卡片加载失败: ${cardId}`" />
        <component v-else :is="cardComponent" :config="mergedConfig" v-bind="$attrs" />
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useCardStore } from '@/stores/card';

export default {
    name: 'CardWrapper',
    props: {
        cardId: { type: String, required: true },
        cardConfig: { type: Object, default: () => ({}) }
    },
    setup(props) {
        const cardStore = useCardStore();
        const loading = ref(false);
        const error = ref(null);
        const cardComponent = ref(null);

        // 获取卡片元数据中的默认配置
        const meta = computed(() => cardStore.catalog.find(c => c.id === props.cardId));

        // 合并配置：默认配置 + 传入配置
        const mergedConfig = computed(() => ({
            ...(meta.value?.defaultConfig || {}),
            ...props.cardConfig
        }));

        onMounted(async () => {
            try {
                loading.value = true;
                const comp = await cardStore.loadCard(props.cardId);
                cardComponent.value = comp;
            } catch (err) {
                error.value = err;
            } finally {
                loading.value = false;
            }
        });

        return {
            loading,
            error,
            cardComponent,
            mergedConfig
        };
    }
};
</script>

<style scoped>
.card-wrapper {
    height: 100%;
    width: 100%;
    overflow: auto;
}
</style>
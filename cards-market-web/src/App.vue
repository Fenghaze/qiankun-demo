<template>
    <div class="test-container">
        <header>
            <h1>🧪 卡片测试入口</h1>
            <p>当前环境：开发模式 | 卡片总数：{{ cards.length }}</p>
        </header>

        <div class="cards-grid">
            <div v-for="card in cards" :key="card.name" class="card-preview">
                <div class="card-header">
                    <h3>{{ card.title }}</h3>
                    <span class="card-id">{{ card.name }}</span>
                </div>

                <div class="card-demo">
                    <component :is="card.component" :config="card.config" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import UserInfoCard from '@/cards/userinfo-card/UserInfoCard.vue';
import ListCard from '@/cards/list-card/ListCard.vue';

export default {
    name: 'App',
    setup() {
        // 卡片列表配置
        const cards = ref([
            {
                name: 'user-info',
                title: '👤 用户信息卡片',
                component: UserInfoCard,
                config: {
                    showAvatar: true
                }
            },
            {
                name: 'list-card',
                title: '📋 列表卡片',
                component: ListCard,
                config: {
                    items: ['任务一', '任务二', '任务三', '任务四']
                }
            }
        ]);

        return {
            cards,
        };
    }
};
</script>

<style scoped>
.test-container {
    padding: 20px;
    font-family: Arial, sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
}

header {
    margin-bottom: 30px;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 24px;
}

.card-preview {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.card-header {
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 {
    margin: 0;
    font-size: 1.2rem;
}

.card-id {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: 20px;
    font-size: 0.8rem;
}

.card-demo {
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.card-actions {
    padding: 12px 20px;
    background: #fafafa;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.card-actions button {
    background: #667eea;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;
}

.card-actions button:hover {
    background: #5a67d8;
}
</style>
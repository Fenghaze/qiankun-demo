<template>
    <div class="list-card">
        <h3>{{ title }}</h3>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ListCard',
    props: {
        config: {
            type: Object,
            default: () => ({
                items: ['任务一', '任务二', '任务三'] // 默认数据
            })
        }
    },
    setup(props) {
        const title = '待办列表';
        // 优先使用传入的 config.items，否则使用默认数据
        const list = ref(props.config.items || ['任务一', '任务二', '任务三']);

        return {
            title,
            list
        };
    }
});
</script>

<style>
.list-card {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

ul {
    padding-left: 20px;
}

li {
    margin: 8px 0;
}
</style>
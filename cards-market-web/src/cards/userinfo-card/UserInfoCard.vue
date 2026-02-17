<template>
    <div class="user-info-card">
        <h3>{{ title }}</h3>
        <div class="info-item">
            <span class="label">姓名：</span>
            <span>{{ user.name }}</span>
        </div>
        <div class="info-item">
            <span class="label">邮箱：</span>
            <span>{{ user.email }}</span>
        </div>
        <div class="info-item">
            <span class="label">角色：</span>
            <span>{{ user.role }}</span>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'UserInfoCard',
    setup() {
        // 模拟用户数据
        const user = ref({
            name: '张三',
            email: 'zhangsan@example.com',
            role: '管理员',
        });

        const title = '用户信息';

        return {
            user,
            title
        };
    }
});
</script>

<style>
.user-info-card {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-item {
    margin: 8px 0;
}

.label {
    font-weight: bold;
    margin-right: 8px;
}
</style>
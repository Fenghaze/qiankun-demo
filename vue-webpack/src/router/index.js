import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'root',
        component: () => import('@/views/IndexView.vue'),
    },
    {
        path: '/vue-webpack/',
        name: 'index',
        component: () => import('@/views/IndexView.vue'),
    },
    {
        path: '/vue-webpack/home', // 子应用路由需要加上项目名称
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/vue-webpack/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
    },
];
const base = window.__POWERED_BY_QIANKUN__ ? '/vue-webpack/' : '/';
const router = createRouter({
    history: createWebHashHistory(base),
    routes,
});

export default router;
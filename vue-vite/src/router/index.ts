import { createRouter, createWebHashHistory } from "vue-router"
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const routes: any[] = [
    {
        path: '/',
        name: 'root',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/vue-vite/',
        name: 'index',
        component: () => import('@/views/HomeView.vue'),
    }
]

const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vue-vite/' : '/';
const router = createRouter({
    history: createWebHashHistory(base),
    routes: routes
})

export default router
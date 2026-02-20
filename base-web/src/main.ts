import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun';
import router from './router';
import './permisstion'

registerMicroApps([
    {
        name: 'vue-webpack', // 子应用pakckage.json中的name
        entry: '//localhost:8080', // 子应用的地址
        container: '#sub-container', // 子应用挂载的节点
        activeRule: '#/vue-webpack', // 子应用的路由入口
        props: {}, // 子应用接受的变量
    },
    // {
    //     name: 'vue-vite',
    //     entry: '//localhost:8081',
    //     container: '#sub-container',
    //     activeRule: '#/vue-vite',
    // },
]);
// 启动 qiankun
start();
createApp(App).use(router).mount('#app')

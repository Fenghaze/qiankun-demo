import { createApp } from 'vue'
import App from './App.vue'
import './public-path.js'
import router from './router';

let appInstance = null;

const render = (props = {}) => {  
    const { container } = props;
    appInstance = createApp(App);
    appInstance.use(router)
    appInstance.mount(container ? container.querySelector('#app') : '#app');
};

export async function bootstrap() {
    console.log('main-web bootstrap');
}

export async function mount(props) {
    console.log('main-web mount', props);
    render(props);
}

export async function unmount() {
    console.log('main-web unmount');
    if (appInstance) {
        appInstance.unmount();
        appInstance._container.innerHTML = '';
        appInstance = null;
    }
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

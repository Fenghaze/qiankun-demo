import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router'
// vite打包qiankun项目需要引入专用插件
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app: any = null

const render = (props: any) => {
    const { container } = props
    app = createApp(App)
    app.use(router)
    app.mount(container ? container.querySelector('#app') : '#app')
}

const initQiankun = () => {
    renderWithQiankun({
        bootstrap() {
            console.log('main-web bootstrap')
        },
        mount(props) {
            console.log('main-web mount', props)
            render(props)
        },
        unmount() {
            console.log('main-web unmount')
            if (app) {
                app.unmount()
                app._container.innerHTML = ''
                app = null
            }
        },
        update() {},
    })
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQiankun() : render({})
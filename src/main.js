// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//重置样式表
import "./assets/css/reset.css"

//公共组件
import commonComponents from "./components/index"
for (let i in commonComponents) {
    Vue.component(i, commonComponents[i])
}

//引入过滤器
import filters from "./filters/index"
for (let i in filters) {
    Vue.filters(i, filters[i])
}

//引入store
import store from './store'

//引入element-ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)


//图片前缀
Vue.prototype.$imgPre = "http://localhost:3000"

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store:store,
    components: { App },
    template: '<App/>'
})
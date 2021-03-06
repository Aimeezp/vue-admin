import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import request from '@/utils/request'
import 'element-ui/lib/theme-chalk/index.css'; 
import 'view-design/dist/styles/iview.css'
import './permission'

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(ElementUI);

Vue.prototype.$axios = axios
Vue.prototype.$request = request

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
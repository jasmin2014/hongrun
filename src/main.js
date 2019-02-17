// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import store from './store/index'
import 'babel-polyfill';
import './assets/iconfont/iconfont.css'
import './assets/style.css'
window.$ = window.jQuery = require('jquery');
import countDownAPI from './utils/countDown.js';
Vue.prototype.countDownAPI = countDownAPI;

window.Base64 = require('js-base64').Base64;

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './utils/lang'
import './router/action';
import './utils/filters/Index'
import './utils/directives/Index'
import './mint-ui'
import "amfe-flexible";
Vue.config.productionTip = false;


// 国际化 - 语言
Vue.use(i18n);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

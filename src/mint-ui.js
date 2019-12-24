// mint-ui
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
// 第三方库
import VueClipboard from 'vue-clipboard2';
import 'swiper/dist/css/swiper.css';
import '@/components/icons'; // svg
import PopupInfo from './components/PopupInfo'; // svg
import PopupCommon from './components/PopupCommon'; // svg

import './assets/css/public.scss'
// mint-ui
Vue.use(Mint);

// 第三方库
Vue.use(VueClipboard);
Vue.component('PopupInfo', PopupInfo)
Vue.component('PopupCommon', PopupCommon)
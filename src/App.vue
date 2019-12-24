<template>
  <div id="app">
    <transition name="van-fade" mode="out-in" v-if="!$route.meta.keepAlive">
      <router-view class="routerView" :key="$route.name"></router-view>
    </transition>
    <keep-alive>
      <router-view
        class="routerView"
        v-if="$route.meta.keepAlive"
      ></router-view>
    </keep-alive>
    <div class="tabbarDiv" v-if="!$route.meta.noTabbar">
      <tabbar class="tabbar" />
    </div>
  </div>
</template>
<script>
import Tabbar from '@/components/Tabbar';
import DApp from '@/utils/wallet';
import { GetUrlPara } from '@/utils/public'

export default {
  components: {
    Tabbar
  },
  data() {
    return {
      language: 'en',
    };
  },
  mounted() {
    this.handleGetChannel();
    this.handleGetPhoneLanguage();
  },
  methods: {
    // 获取dapp名称
    handleGetChannel() {
      const oldChannel = localStorage.getItem('channel');
      const newChannel = GetUrlPara().channel;
      let channel = newChannel && oldChannel !== newChannel ? newChannel : oldChannel
      if (!channel) {
        channel = 'scatter'
      }
      this.$store.dispatch('setChannel', channel);

      const newChain = GetUrlPara().chain || this.$store.state.sys.urlChain || 'eos';
      this.$store.dispatch('setUrlChain', newChain);

      DApp.setChannel(channel, newChain);
      this.handleGetAccount();
    },
    // 获取用户信息
    handleGetAccount() {
      DApp.getAccount((e, data) => {
        if (e) {
          this.handleGetAccount()
          return;
        }
        this.$store.dispatch('setAccountInfo', data);
      });
    },
    // 第一次使用dapp时，获取手机语言
    handleGetPhoneLanguage() {
      const lang = localStorage.getItem('language')
      if (lang) {
        return;
      }
      if (navigator.language) {
        this.language = navigator.language;
      } else {
        this.language = navigator.browserLanguage;
      }
      if (this.language !== 'zh-CN' && this.language !== 'zh-TW' && this.language !== 'ko') {
        this.language = 'en';
      }
      this.$i18n.locale = this.language;
      this.$store.dispatch('setLanguage', this.language);
    },
  }
};
</script>
<style lang="scss" scoped>
@import '~style/animation.scss';

html,
body,
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Helvetica Neue, Arial, Microsoft YaHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 750PX;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.routerView {
  overflow: scroll;
  overflow: hidden !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  background: #f3f3f3;
  flex: 1;
  font-size: 28px; //全局默认字体大小
}

.tabbarDiv{
  height: 100px;
  .tabbar{
    max-width: 750PX;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background: $color-white;
  }
}
</style>

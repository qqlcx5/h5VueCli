<template>
  <div class="tabbar">
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 0}" @click="handleChangeTabbar(0)">
        <!-- <div class="iconfont icon-huaban43 img"></div> -->
        <svg-icon :icon="'index'" :size="45" />
        <div class="name">首页</div>
      </div>
    </div>
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 1}" @click="handleChangeTabbar(1)">
        <!-- <div class="iconfont icon-huaban5 img"></div> -->
        <svg-icon :icon="'shoucan'" :size="45"/>
        <div class="name">USN</div>
      </div>
    </div>
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 2}" @click="handleChangeTabbar(2)">
        <span class="tabPoint" v-if="$store.state.app.unReadCount > 0">{{ $store.state.app.unReadCount }}</span>
        <!-- <div class="iconfont icon-huaban151 img"></div> -->
         <svg-icon :icon="'diya'" :size="45" />
        <div class="name">爆仓抢拍</div>
      </div>
    </div>
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 3}" @click="handleChangeTabbar(3)">
        <!-- <span class="iconfont icon-huaban153 hot"></span>
        <div class="iconfont icon-huaban6 img"></div> -->
        <svg-icon :icon="'language'" :size="45" />
        <div class="name">Newdex</div>
      </div>
    </div>
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 4}" @click="handleChangeTabbar(4)">
        <!-- <div class="iconfont icon-huaban83 img"></div> -->
        <svg-icon :icon="'acount'" :size="45" />
        <div class="name">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0, // 选择 tabbar
      url: [ // 页面路由
        'index',
        'usn',
        'snatch',
        'newdex',
        'my'
      ]
    }
  },
  props: [
  ],
  components: {
  },
  watch: {
    // 根据路由判断当前选中tabbar
    $route: function listen(newVal) {
      const path = newVal.name;
      this.active = this.url.findIndex(item => item === path);
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // tabbar 切换
    handleChangeTabbar(num) {
      if (num === 3) {
        console.log(num); // eslint-disable-line
        return
      }
      this.active = num;
      // this.$router.push(this.url[num]);
      const routeName = this.$route.name;
      if (routeName === this.url[num]) {
        return;
      }
      this.$router.push({
        name: this.url[num],
      });
    },
  },
  beforeDestroy() {
  }
}
</script>

<style  lang="scss" scoped>
// @import '~style/color.scss';

.tabbar{
  height: 100px;
  background-color: #111;
  width: 100%;
  font-size: 21px;
  display: flex;
  color: $color-999;

  .tabar-item{
    flex: 1;
    display: flex;
    align-items: center;/*垂直居中*/
    justify-content: center;/*水平居中*/
    position: relative;

    .content{
      // width: 100px;
      text-align: center;

      .hot{
        background: #FFF;
        padding-left: 1px;
        color: $color-red;
        font-size: 25px;
        position: absolute;
        top: 6px;
        right: 44px;
        z-index: 10;
      }
    }

    .tabPoint{
      position: absolute;
      right: 40px;
      top: 5px;
      color: white;
      width: 35px;
      height: 35px;
      background: $color-red;
      border-radius: 100%;
      font-size: 18px;
      display: flex;
      align-items: center;/*垂直居中*/
      justify-content: center;/*水平居中*/
    }
  }

  .img{
    width: 45px;
    height: 45px;
    font-size: 35px;
    line-height: 45px;
    display: inline-block;
  }
}
</style>

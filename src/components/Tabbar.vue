<template>
  <div class="tabbar">
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 0}" @click="handleChangeTabbar(0)">
        <svg-icon icon="icon-huaban16" :size="45" />
        <div class="name">首页</div>
      </div>
    </div>
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 1}" @click="handleChangeTabbar(1)">
        <svg-icon icon="icon-huaban1" :size="45"/>
        <div class="name">USN</div>
      </div>
    </div>
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 2}" @click="handleChangeTabbar(2)">
        <span class="tabPoint" v-if="$store.state.app.unReadCount > 0">{{ $store.state.app.unReadCount }}</span>
         <svg-icon icon="icon-huaban26" :size="45" />
        <div class="name">爆仓抢拍</div>
      </div>
    </div>
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 3}" @click="handleChangeTabbar(3)">
        <svg-icon icon="icon-huaban2" :size="45" />
        <div class="name">Newdex</div>
      </div>
    </div>
    <div class="tabar-item">
      <div class="content" :class="{'color-green': active === 4}" @click="handleChangeTabbar(4)">
        <svg-icon icon="icon-huaban25" :size="45" />
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
      this.active = num;
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
      text-align: center;
      .name{
        margin-top: 6px;
      }
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

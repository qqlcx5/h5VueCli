<template>
  <div>
    <!-- navTab -->
    <div class="navBar">
      <div class="navItem" :class="{'color-green': active === 0}">
        <span @click="handleChangeTab(0)">生成USN</span>
        <div class="bottom" v-if="active === 0"></div>
      </div>
      <div class="navItem" :class="{'color-red': active === 1}">
        <span @click="handleChangeTab(1)">偿还USN</span>
        <div class="bottom borderColorRed" v-if="active === 1"></div>
      </div>
      <div class="navItem" :class="{'color-this': active === 2}">
        <span @click="handleChangeTab(2)">管理抵押量</span>
        <div class="bottom borderColorBlue" v-if="active === 2"></div>
      </div>
    </div>

    <div class="content">
      <generate-usn v-show="active === 0" :userData="userData"/>
      <repay-usn v-show="active === 1" :userData="userData"/>
      <manage v-show="active === 2" :userData="userData"/>
    </div>
  </div>
</template>

<script>
// import Swiper from 'swiper';
import GenerateUsn from '../components/GenerateUsn'
import RepayUsn from '../components/RepayUsn'
import Manage from '../components/Manage'

export default {
  components: {
    GenerateUsn, // 生成USN
    RepayUsn, // 偿还USN
    Manage, // 管理抵押量
  },
  data() {
    return {
      active: 0,
      swiper: null,
      serveStop: false, // 服务
      userData: { // 用户数据
        allGenerate: '10.0000', // 总生成
        eosPrice: '2.8000', // EOS价格指数
        interestNum: '0.2123', // 债仓利息
        allStaked: '100.0000', // 已经抵押的EOS数量
        snatchPrice: '0.0010', // 爆仓价格
      },
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.handleSwiperStart();
    // }, 200);
    const params = this.$route.params;
    this.active = params.active || 0;
  },
  methods: {
    handleChangeTab(index) { // 切换Tab
      this.active = index;
      // this.swiper.slideTo(index, 100, false);
    },
    // 启动swiper
    // handleSwiperStart() {
    //   // swiper
    //   this.swiper = new Swiper('.swiper-container_index', {
    //     pagination: '.swiper-pagination_index',
    //   })
    // },
  }
}
</script>

<style lang="scss" scoped>
@import '~style/color.scss';
@import '~style/mixin.scss';

.navBar{
  @include flexbothSides();
  height: 80px;
  background: $color-white;
  color: $color-999;
  font-size: 28px;

  .navItem{
    flex: 1;
    text-align: center;
    position: relative;
    height: 80px;
    @include flexCenter();

    .bottom{
      border-bottom: 3px solid $color-green;
      width: 153px;
      position: absolute;
      bottom: 1px;

      &.borderColorRed{
        border-bottom: 3px solid $color-red;
      }

      &.borderColorBlue{
        border-bottom: 3px solid $color-blue;
      }
    }
  }
}

.content{
  margin-top: 9px;
  background: $color-white;
}
</style>

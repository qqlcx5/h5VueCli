<template>
  <div class="snatch">
    <!-- navTab -->
    <div class="navBar">
      <div class="navItem" :class="{'color-green': active === 0}">
        <span @click="handleChangeTab(0)">已爆仓</span>
        <div class="bottom" v-if="active === 0"></div>
      </div>
      <div class="navItem" :class="{'color-green': active === 1}">
        <span @click="handleChangeTab(1)">即将爆仓</span>
        <div class="bottom" v-if="active === 1"></div>
      </div>
      <div class="navItem" :class="{'color-green': active === 2}">
        <span @click="handleChangeTab(2)">我的抢拍</span>
        <div class="bottom" v-if="active === 2"></div>
      </div>
    </div>
    <div class="content">
      <div class="swiper-container swiper-container_index">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <Burst :realTimeData="realTimeData" />
          </div>
          <div class="swiper-slide">
            <SoonSnach></SoonSnach>
          </div>
          <div class="swiper-slide">
            <MySnatch ></MySnatch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marginCall } from "@/service"
import Swiper from "swiper";
import MySnatch from './components/MySnatch';
import SoonSnach from './components/SoonSnach';
import Burst from './components/Burst';

export default {
  name: "snatch",
  components:{
    MySnatch,
    SoonSnach,
    Burst
  },
  data() {
    return {
      swiper: null,
      active: 0,
      realTimeData: []
    };
  },
  mounted() {
    this.handleInitData();
    setTimeout(() => {
      this.handleSwiperStart();
    }, 200);
  },
  methods: {
    // 数据初始化
    async handleInitData() {
      const params = {
        account: 'testuseraaaa'
      }
      // 获取爆仓订单列表
      const {status, result} = await marginCall.getMarginCallPage(params);
      if (status) {
        const realTimeData = result.page;
        let arry1 = [];
        let arry2 = [];
        realTimeData.forEach(item => {
          if (!item.isFinish) arry1.push(item); else arry2.push(item)
        });
        arry1.sort((a, b) => { // 根据抢拍价格排序
          return a.sanpPrice - b.sanpPrice;
        });
        arry2.sort((a, b) => { // 根据爆单时间排序
          return Date.parse(a.transTime) - Date.parse(b.transTime);//时间正序
        });
        this.realTimeData = arry1.concat(arry2);
      }
    },
    handleChangeTab(index) {
      // 切换Tab
      this.active = index;
      this.swiper.slideTo(index, 100, false);
    },
    // 启动swiper
    handleSwiperStart() {
      // swiper
      this.swiper = new Swiper(".swiper-container_index", {
        onTransitionEnd: (swiper) => {
          this.handleChangeTab(swiper.activeIndex);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navBar {
  @include flexbothSides();
  height: 80px;
  background: $color-white;
  color: $color-999;
  font-size: 28px;
  border-bottom: 9px solid #f3f3f3;

  .navItem {
    flex: 1;
    text-align: center;
    position: relative;
    height: 80px;
    @include flexCenter();

    .bottom {
      border-bottom: 3px solid $color-green;
      width: 153px;
      position: absolute;
      bottom: 1px;
    }
  }
}

</style>

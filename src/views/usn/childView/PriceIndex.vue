<template>
  <div>
    <div class="exponentDiv">
      <span>EOS价格指数</span>
      <span class="color-add">3.2324 USN <span class="small">+4.45％</span></span>
    </div>
    <div class="kline">
      <trad-view :trad="trad"/>
    </div>
    <!-- 最新记录 -->
    <div class="newList">
      <div class="subTool">
        <span>最新记录</span>
        <span class="minsTip">关于EOS价格指数＞</span>
      </div>
      <div class="lists">
        <div class="list" v-for="(item, $index) in 4" :key="$index">
          <div>
            <img class="image" src="@/assets/img/chain/EOS.png" alt="">
            <div class="num">1230.1223 USN</div>
          </div>
        </div>
        <div class="list" >
          <div>
            <div></div>
            <div class="num color-this">历史价格</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TradView from '@/components/tradeView/TradView';

export default {
  name: 'UsnCenterRight', // k线
  data() {
    return {
      trad: {
        id: 4,
        symbol: "newdexissuer-ndx-eos",
        symbol1: "NDX",
        symbol1_code: "newdexissuer",
        symbol2: "EOS",
        symbol2_code: "eosio.token",
        riskStatus: 0,
        coinDecimal: 4,
        priceDecimal: 8,
        valuationCoinDecimal: 4,
        valuationChain: "eos",
        baseChain: "eos",
        crossNoLink: true,
        dexEntrustedAccount: "newdexpublic",
      }
    }
  },
  components: {
    TradView,
  },
  props: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
  .exponentDiv{
    @include flexbothSides;
    // border-top: 12px solid #f3f3f3;
    padding: 35px 30px 33px;
    font-size: 25px;
    color: #333333;
    box-sizing: border-box;
    background-color: #fff;
    .small{
      font-size: 25px;
    }
  }
  .kline{
    height: 600px;
    background-color: #666;
    position: relative;
  }
  .newList {
    .subTool {
      height: 78px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px 0 25px;
      font-size: 25px;
      background: #F3F3F3;

      .minsTip {
        color: $color-this;
      }
    }
    .lists {
      background: #fff;
      padding: 0 30px 25px;
      box-sizing: border-box;
      .list {
        padding: 25px 0px;
        font-size: 28px;
        color: #333333;
        border-bottom: 2px solid $color-input;

        &:last-child {
          border-bottom: none;
        }
        & > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .image{
            height: 68px;
          }
          .num{
            font-size: 28px;
            color: #333333;
          }
        }
      }
    }
  }
</style>
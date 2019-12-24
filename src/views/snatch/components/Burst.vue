<template>
  <div class="mySnatch">
    <div class="alertDiv">
      <div>及时获取爆仓订单的抢拍提醒 ></div>
      <div>x</div>
    </div>
     <div class="exponentDiv">
      <span>EOS价格指数</span>
      <span class="color-add">{{ eosPrice }} USN</span>
    </div>
    <div class="newList">
        <div class="lists">
          <div class="list" v-for="(item, $index) in realTimeData" :key="$index">
            <div class="acount">
              <span>{{ item.accouName }}</span>
              <mt-button
                class="btn"
                v-if="!item.isFinish"
                type="default"
                @click="handleBlowClick(item)">抢拍</mt-button>
              <span v-if="item.isFinish">抢拍结束</span>
            </div>
            <div class="info">
                <div>
                  <div class="name">抢拍折扣</div>
                  <div class="num">{{ item.snapshot }} 折 
                    <span v-if="item.isFinish && item.snapshot > 9" class="color-add">
                      <count-down
                        :snapshot="item.snapshot"
                        :timer="item.blowTime"
                        @listenCountDown="handlelistenCountDown($index, item)" />
                      秒
                    </span>
                  </div>
                </div>
                <div>
                  <div class="name">剩余可拍</div>
                  <div class="num">{{ item.transfNum }} EOS</div>
                </div>
                <div>
                  <div class="name">爆仓价格(EOS)</div>
                  <div class="num color-green">{{ item.sanpPrice }} USN</div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { accSub } from "@/utils/public"
import CountDown from '@/components/CountDown'
export default {
  name: "mySnatch",
  data() {
    return {
      loading: false,
      coin: ' EOS',
      belowDetailVisible: false, // 订单明细
      belowdetailData: [], // props数据
      belowAuctionVisible: false, // 抢拍
      eosPrice: '', // eos价格指数
    };
  },
  props: {
    realTimeData: Array
  },
  watch: {
    'realTimeData': {
      handler() {},
      immediate: true
    },
  },
  components: {
    CountDown
  },
  mounted() {},
  methods: {
    // 点击抢拍
    handleBlowClick(val) {
      this.belowAuctionVisible = true;
      this.belowdetailData = val;
      this.$router.push({name:'grabShot', params: val})
    },
    // 监听倒计时结束
    handlelistenCountDown(index, row) {
      let snapshots = accSub(row.snapshot, 0.2);
      if (snapshots >= 9) {
        this.realTimeData[index].snapshot = snapshots;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.alertDiv {
  @include flexbothSides;
  padding: 0 24px;
  box-sizing: border-box;
  font-size: 24px;
  color: $color-green;
  height: 65px;
  background: rgba(1,181,164,0.15);
}
.exponentDiv{
  @include flexbothSides;
  // border-top: 12px solid #f3f3f3;
  padding: 35px 30px 33px;
  font-size: 25px;
  color: #333333;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 9px solid #f3f3f3;
}
.newList {
    .lists {
      background: #fff;
      .list {
        padding: 0 25px 47px;
        box-sizing: border-box;
        font-size: 28px;
        color: #333333;
        border-bottom: 9px solid #f3f3f3;

        &:last-child {
          border-bottom: none;
        }
        .acount{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 0 40px;
          font-size: 30px;
          color: #333333;
          .btn{
            border: 1px solid #32AF8D;
            padding: 0 23px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            height: 56px;
            color: $color-green;
            font-size: 25px;
            border-radius: 10px;
          }
          .over{
            color: $color-999;
            font-size: 25px;

          }
        }
        .info{
          display: flex;
          & > div {
          flex: 0 0 33.33%;
          &:last-child{
            text-align: right;
          }
          .name {
            font-size: 25px;
            color: $color-999;
            margin-bottom: 9px;
            span{
              font-size: 21px;
              color: #151515;
            }
          }
          .num {
            font-size: 28px;
            color: #333333;
          }

        }
        }

      }
    }
  }

 </style>


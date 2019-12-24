<template>
  <div>
    <div class="alertDiv">
      <div>抢拍中</div>
      <div>{{ realTimeData.snapshot }} 折
        <span class="small">
          <count-down
            :snapshot="realTimeData.snapshot"
            :timer="realTimeData.blowTime"
            @listenCountDown="listenCountDown" />
          秒
        </span>
      </div>
    </div>
     <div class="acountDiv">
       <div class="acount">
         <div class="name">爆仓账户</div>
         <div class="num">{{ realTimeData.accouName }}</div>
         <div class="selectDiv">
            <div class="selectMenu" v-show="false">
              <div class="select color-333">
                <div >支付宝</div>
                <div >银行卡</div>
              </div>
            </div>
            <!-- 显示内容  -->
            <div><span class="showSubMenuIcon show" ></span></div>
         </div>
       </div>
       <div class="infoDiv">
         <div class="row">
          <div class="name">抢拍价格</div>
          <div class="num">{{ realTimeData.sanpPrice }} USN/EOS</div>
        </div>
         <div class="row">
          <div class="name">成交数量</div>
          <div class="num">{{ realTimeData.saleAcount }} USN/EOS <span class="detail">明细</span> </div>
        </div>
         <div class="row">
          <div class="name">剩余可拍</div>
          <div class="num">{{ realTimeData.transfNum }} USN/EOS</div>
        </div>
       </div>
      </div>
      <!-- 抵押比率 -->
      <div class="actionItem">
        <div class="row">
          <div class="title">抢拍数量</div>
          <div class="inputDiv">
            <input
              type="number"
              @focus="handleGetMoneyByNumber"
              @blur="handleBlurNumber"
              v-model="form.inputNum">
            <span>EOS</span>
          </div>
        </div>
          <div class="balance">剩余可拍：{{ realTimeData.transfNum }} EOS</div>
        <div class="row">
          <div class="title">抢拍金额</div>
          <div class="inputDiv">
            <input
              type="number"
              @focus="handleGetNumberByMoney"
              @blur="handleBlurMoeny"
              v-model="form.inputPrice">
            <span>USN</span>
          </div>
        </div>
          <div class="balance">余额{{ realTimeData.remainTake }} EOS</div>
          <div class="row">
            <div class="title"></div>
              <div class="range">
                <div class="desc">
                  <span>
                    <span class="before" @click="handleRangeSet(0)" :class="{'border-green': rangeValue >= 0}"></span>
                  </span>
                  <span>
                    <span class="before" @click="handleRangeSet(25)" :class="{'border-green': rangeValue >= 25}"></span>
                  </span>
                  <span>
                    <span class="before" @click="handleRangeSet(50)" :class="{'border-green': rangeValue >= 50}"></span>
                  </span>
                  <span>
                    <span class="before" @click="handleRangeSet(75)" :class="{'border-green': rangeValue >= 75}"></span>
                    <span class="last" @click.stop="handleRangeSet(100)" :class="{'border-green': rangeValue >= 100}"></span>
                  </span>
                </div>
                <mt-range v-model="form.pesent" :min="0" :max="100" :step="1" :bar-height="5">
                </mt-range>
                <div class="percent">
                  <span>0</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
            </div>
          </div>
      </div>
      <div style="height:128px;"></div>
      <div class="placeOrder">
        <div class="btn" @click="handleToSuccess">抢拍下单</div>
      </div>
  </div>
</template>
<script>
import { toFixed, accSub, accMul, accDiv } from "@/utils/public"
import { order } from "@/service"
import DApp from '@/utils/wallet';
import CountDown from '@/components/CountDown'
export default {
  data() {
    return {
      inputRang:0,
      rangeValue: 0,
      form: {
        inputNum: 0.00,
        inputPrice: 0.00,
        pesent: 0 // 当前显示的百分比
      },
      comitFormat: {
        belowNum: '0', // 默认的抢拍数量
        belowPrice: '0' // 默认的抢拍金额
      },
      realTimeData: [],
      blowSuccessVisible: false, // 抢拍成功
      blowSuccessData: [], // 抢拍成功数据
      numFocus: false,
      moneyFocus: false
    }
  },
  mounted() {
    this.realTimeData = this.$route.params;
  },
  components: {
    CountDown
  },
  watch: {
    // 监听百分比变化
    'form.pesent': {
      handler(newVal) {
        const persent = Number(newVal);
        let computedMoney = Number(accMul(this.realTimeData.remainTake, persent / 100));
        this.form.inputPrice = toFixed(computedMoney, 4);
        this.handleGetNumberByMoney();
      },
      immediate: false
    },
    // 监听折扣改变价格
    'realTimeData.snapshot': {
      handler(newVal) {
        const shot = Number(newVal);
        let computedMoney = Number(accMul(this.realTimeData.sanpPrice, shot / 10));
        this.realTimeData.sanpPrice = toFixed(computedMoney, 4);
      },
      immediate: true
    },
    // 监听输入数量
    'form.inputNum': {
      handler(newVal) {
        if (newVal === '' || this.moneyFocus) {
          return;
        }
        if (!newVal || Number(newVal) <= 0) {
          this.form.inputPrice = '0.0000';
          return;
        }
        const compitedPrice = accMul(newVal, this.realTimeData.sanpPrice);
        this.form.inputPrice = toFixed(compitedPrice, 4);
      },
      immediate: true
    },
    // 监听输入金额
    'form.inputPrice': {
      handler(newVal) {
        if (newVal === '' || this.numFocus) {
          return;
        }
        if (!newVal || Number(newVal) <= 0) {
          this.form.inputNum = 0;
          return;
        }
        const compitedNum = accDiv(newVal, this.realTimeData.sanpPrice);
        this.form.inputNum = toFixed(compitedNum, 4);
      },
      immediate: true
    }
  },
  methods: {
    handleRangeSet(index) {
      this.form.pesent = index;
    },
    // 监听倒计时结束
    listenCountDown() {
      let snapshots = accSub(Number(this.realTimeData.snapshot), 0.2);
      if (snapshots >= 9) {
        this.realTimeData.snapshot = snapshots;
      }
    },
    // 点击抢拍
    async sureBlow() {
      const { status, result } = await order.blowBefore(); // 抢拍成功
      if(status) {
        this.$emit('listenSetRemind', false);
        this.blowSuccessData = result.data[0];
        this.blowSuccessVisible = true;
      } else {
        if (result.code === -1) {
          this.$emit('listenSetRemind', false);
        }
      }
    },
    // 输入数量监听
    handleGetMoneyByNumber() {
      this.numFocus = true;
    },
    // 抢拍数量失去焦点
    handleBlurNumber() {
      setTimeout(() => {
        this.numFocus = false;
      }, 500);
      let num = this.form.inputNum;
      if (num > this.realTimeData.remainTake) {
        this.form.inputNum = toFixed(Number(this.realTimeData.remainTake), 4);
        return
      }
      this.form.inputNum = toFixed(Number(num), 4);
    },
    // 输入金额监听
    handleGetNumberByMoney() {
      this.moneyFocus = true;
    },
    // 抢拍金额失去焦点
    handleBlurMoeny() {
      setTimeout(() => {
        this.moneyFocus = false;
      }, 500);
      this.form.inputPrice = toFixed(Number(this.form.inputPrice), 4);
    },
    // 点击抢拍
    async handleToSuccess() {
      const params = {
        actions: [
          {
            account: 'usntoken1111', // USN合约账户
            data: {
              from: 'panyong11111', // 自己账户
              to: 'usncontract1',
              quantity: `${this.form.inputPrice} USN`,
              memo: `bid:${this.form.inputNum}`
            }
          }
        ]
      };
      DApp.transfer(params, (err) => {
        if (err) {
          return
        }
        this.$router.push({
          name: '', // 跳转成功页面
        })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .alertDiv {
    @include flexbothSides;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 30px;
    color: #FFFFFF;
    height: 120px;
    background: $color-green;
    .small{
      font-size: 24px;
    }
  }
  .acountDiv{
    // @include flexbothSides;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    font-size: 25px;
    color: #999;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 9px solid #f3f3f3;
    .acount{
      display: flex;
      align-items: center;
      width: 100%;
      height: 94px;
      // padding: 27px 0 30px;
      border-bottom: 2px solid #C7C7C7;

      .selectDiv{
        // flex:1;
        display: flex;
        align-items: center;
        height: 94px;
        width: 30px;
        position: relative;
        .selectMenu{
          background: #ffffff;
          box-shadow: 0px 0px 7px rgba(74, 144, 226, .31);
          width: 200px;
          box-sizing: border-box;
          position: absolute;
          right: -10px;
          top: 70px;
          border-radius: .13rem;
          z-index: 1000;
          padding: 0 20px;
          box-sizing: border-box;

          &::after{
            content: '';
            border: 10px solid white;
            position: absolute;
            top: -10px;
            right: 20px;
            box-shadow: 0px 0px .07rem rgba(74, 144, 226, .31);
            transform: rotate(45deg);
          }

          .select{
            position: relative;
            z-index: 10;;
            background: #FFF;
            font-size: .25rem;
            border-radius: 13px;

            &>div{
              // line-height: .86rem;
              height: 86px;
              border-bottom: 1px solid #e3e3e3;
              display: flex;
              justify-content: center;
              align-items: center;

              &:last-child{
                border-bottom: 0px solid #e3e3e3;
              }
            }
          }
        }
        .showSubMenuIcon {
          position: absolute;
          right: 10px;
          top: 44px;
          border: 8px solid transparent;
          border-top: 8px solid black;
          &.show {
            transform: rotate(180deg);
            margin-top: -8px;
            border-top: 8px solid $color-this;
          }
        }
      }
    }
    .name{width: 160px;}
    .num{
      flex: 1;
      font-size: 28px;
      color: #333333;}
    .infoDiv{
      padding: 37px 0 18px;
      .row{
        display: flex;
        margin-bottom: 24px;
        .detail{
          font-size: 25px;
          margin-left: 24px;
          color: $color-green;
        }
      }
    }
  }
  .actionItem{
    padding: 50px 78px 58px 30px;
    box-sizing: border-box;
    background-color: #fff;
    .row{
      display: flex;
      align-items: center;
    }
    .title{
      width: 150px;
      min-width: 150px;
    }
    margin-bottom: 50px;
    &:nth-child(3),
    &:nth-child(4){
      margin-bottom: 32px;
    }
    .inputDiv{
      // margin: 20px 0 9px;
      height: 83px;
      flex: 1;
      border: 1px solid $color-input;
      box-sizing: border-box;
      display: flex;
      border-radius: 6.94px;
      padding: 0 20px 0 26px;
      color: $color-999;
      @include flexbothSides();
      position: relative;

      input{
        font-size: .32rem;
        color: $color-333;
        flex: 1;
        width: 100%;
        margin-right: 8px;
        height: 100%;;
      }
    }
    .balance{
      text-align: right;
      margin: 9px 0 40px;
      color: $color-999;
    }

    .range{
      flex: 1;
      position: relative;
    }
    .desc{
      display: flex;
      align-items: center;/*垂直居中*/
      position: absolute;
      width: 100%;
      height: 50px;
      z-index: 1;
      line-height: 50px;

      &>span{
        flex: 1;
        height: 40px;
        display: flex;
        align-items: center;/*垂直居中*/
        text-align: right;

        .before{
          display: inline-block;
          border: 2px solid $color-999;
          height: 25px;
          width: 24px;
          border-radius: 50%;
          transform: translate(-50%, 0);
          background: #ffffff;
          box-sizing: border-box;

          &.border-green{
            border-color: $color-green;
          }
        }

        &:nth-child(2) .before{
          transform: translate(-50%, 0);
        }
        &:nth-child(1) .before{
          transform: translate(0, 0);
        }

        .last{
          background: #ffffff;
          border: 2px solid $color-999;
          height: 25px;
          width: 25px;
          border-radius: 50%;
          position: absolute;
          right: 0px;
          box-sizing: border-box;
        }

      }
    }

    /deep/ .mt-range{
      height: 50px;
      line-height: 50px;

      .mt-range-content{
        margin: 0 20px 0 0;
      }

      .mt-range-runway{
        right: -5px;
      }

      .mt-range-thumb{
        width: 50px;
        height: 50px;
        z-index: 10;
        transform: translateX(-25%);
        box-shadow: 0px 0px 4px rgba(0,0,0,.4)
      }

      .mt-range-progress{
        background-color: $color-green;
      }
    }

    .percent{
      color: $color-999;
      margin-top: 16px;
      @include flexbothSides();
    }
  }
  .placeOrder{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 22px 46px;
    box-sizing: border-box;
    background-color: #fff;
    .btn{
      @include btn(100%,80px,$color-green,$color-white,32px);
    }
  }

</style>
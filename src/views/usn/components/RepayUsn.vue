<template>
  <div class="mainDiv">
    <div class="ganage">
      <!-- 服务暂停 -->
      <serve-stop v-if="false" />

      <div class="actions">
        <!-- 待还总额 -->
        <div class="actionItem">
          <div class="title">
            <span>待还总额</span>
            <span>（含利息）</span>
          </div>
          <div class="totalRepay">{{ totalRepay }} USN</div>
        </div>
        <!-- 抵押数量 -->
        <div class="actionItem">
          <div class="title">偿还金额</div>
          <div class="inputDiv">
            <input type="number" v-model="repayNum" @focus="handleRepayFocus" @blur="handleRepayBlur">
            <span>USN</span>
          </div>
          <div class="interest">
            <span>
              <span>含利息</span>
              <span class="interestCount">{{ repayInterest }} USN</span>
            </span>
            <span class="detail" v-if="Number(repayInterest)" @click="handleToDetail">明细</span>
          </div>
          <div class="balance" @click="handleClickBalance">余额：{{ balance }} USN</div>
        </div>
        <!-- 减少抵押量 -->
        <div class="addStake" @click="handleChaneUnstaked">
          <div class="checkboxDiv" :class="{'checked': showReduceStake}">
            <svg-icon :icon="'checkbox'" :size="28" :svgClass="'color-red'" v-if="showReduceStake"/>
          </div>
          <span>减少抵押量</span>
        </div>
        <!-- 抵押比率 -->
        <div class="actionItem" v-if="showReduceStake">
          <div class="title">抵押比率</div>
          <div class="inputDiv">
            <input type="number" v-model="inputRang" @focus="handlePercentFocus" @blur="handlePercentBlur">
            <span>%</span>
          </div>
          <div class="range">
            <div class="desc">
              <span>
                <span class="before" @click="handleRangeSet(150)" :class="{'border-red': rangeValue >= 150}"></span>
              </span>
              <span>
                <span class="before" @click="handleRangeSet(225)" :class="{'border-red': rangeValue >= 225}"></span>
              </span>
              <span>
                <span class="before" @click="handleRangeSet(300)" :class="{'border-red': rangeValue >= 300}"></span>
              </span>
              <span>
                <span class="before" @click="handleRangeSet(400)" :class="{'border-red': rangeValue >= 400}"></span>
                <span class="last" @click.stop="handleRangeSet(500)" :class="{'border-red': rangeValue >= 500}"></span>
              </span>
            </div>
            <mt-range v-model="rangeValue" :min="150" :max="500" :step="1" :bar-height="5">
            </mt-range>
            <div class="percent">
              <span>150%</span>
              <span>300%</span>
              <span>500%</span>
            </div>
            <div class="reduceNum">
              <span>减少抵押量</span>
              <span>{{ unstakedNum }} EOS</span>
            </div>
            <div class="balance" @click="handleMaxUnstaked">最大可减少：{{ maxUnstakedNum }} EOS</div>
          </div>
        </div>
        <!-- 生成数量 -->
        <!-- <div class="actionItem" v-if="showReduceStake">
          <div class="title">减少抵押量</div>
          <div class="inputDiv">
            <input type="number">
            <span>EOS</span>
          </div>
          <div class="balance">最大可减少：0 EOS</div>
        </div> -->
        <div class="btnDiv">
          <div class="btn" @click="handleBtnClick">偿还USN</div>
        </div>
      </div>
      <div>
        <after-action :type="'repay'" :afterActionData="afterActionData" />
      </div>
    </div>
    <div>
      <Indicators />
    </div>
  </div>
</template>

<script>
import { toFixed } from '@/utils/public.js';
import { repayUsn } from '@/utils/logic.js';
import DApp from '@/utils/wallet';
import ServeStop from '@/components/ServeStop';
import AfterAction from './AfterAction';
import Indicators from './Indicators';

export default {
  components: {
    AfterAction,
    Indicators,
    ServeStop
  },
  props: {
    userData: {
      type: Object,
    }
  },
  data() {
    return {
      rangeValue: 150,
      inputRang: 150,
      repayNum: '', // 偿还金额
      repayInterest: '0.0000', // 偿还利息
      afterActionData: {},
      unstakedNum: '0.0000', // 减少抵押量
      maxUnstakedNum: '0.0000', // 最大可减少
      showReduceStake: false, // 显示减少抵押量
      inputRangFocus: false, // 抵押比率输入框选中 - 默认未选中
      totalRepay: '0.0000', // 待还总额
      allRepay: false, // 全部偿还标志
      balance: '2000.0000', // USN余额

      // test
      orderList: [{
        generate: 300,
        interest: 20,
      }, {
        generate: 100,
        interest: 10,
      }]
    }
  },
  mounted() {
    this.afterActionData = this.userData;
    this.totalRepay = Number(this.userData.allGenerate) + Number(this.userData.interestNum); // 待还总额
    this.totalRepay = toFixed(this.totalRepay, 4);
    if (Number(this.totalRepay) === Number(this.repayNum)) {
      this.allRepay = true;
    }
  },
  watch: {
    showReduceStake(newVal) {
      if (newVal) {
        this.inputRangFocus = true;
        this.rangeValue = this.afterActionData.rangPercent;
        this.inputRang = this.afterActionData.percent;
        setTimeout(() => {
          this.inputRangFocus = false;
        }, 200);
      }
      this.handleDealRepay()
    },
    rangeValue(newVal) {
      if (this.inputRangFocus) {
        return;
      }
      this.inputRang = toFixed(newVal, 2);
    },
    inputRang() {
      this.handleDealRepay()
    },
    repayNum() {
      this.allRepay = false;
      if (Number(this.totalRepay) <= Number(this.repayNum)) {
        this.allRepay = true;
        this.showReduceStake = false;
      }
      this.handleDealRepay()
    },
  },
  methods: {
    handleChaneUnstaked() {
      if (this.allRepay) {
        this.$toast('全部偿还')
        return;
      }
      this.showReduceStake = !this.showReduceStake
    },
    // 计算偿还明细
    handleDealRepay() {
      const inData = {
        allStaked: this.userData.allStaked,
        allGenerate: this.userData.allGenerate,
        allInterest: this.userData.interestNum,
        eosPrice: this.userData.eosPrice,
        repayNum: this.repayNum,
        orderList: this.orderList,
        newPercent: this.inputRang,
        type: 'repay',
      }
      if (this.showReduceStake) {
        inData.type = 'unstaked';
      }
      console.log(inData); // eslint-disable-line
      const outData = repayUsn(inData)
      this.afterActionData = outData;
      this.unstakedNum = outData.unstakedNum || '0.0000';
      this.maxUnstakedNum = outData.maxUnstakedNum || '0.0000';
      this.repayInterest = outData.repayInterest || '0.0000';
      console.log(outData); // eslint-disable-line
      if (this.inputRangFocus) {
        this.rangeValue = this.afterActionData.rangPercent;
      }
    },
    handleRangeSet(index) {
      this.inputRang = index;
      this.rangeValue = index;
    },
    // 抵押比率获取焦点事件
    handlePercentFocus() {
      this.inputRangFocus = true;
    },
    // 抵押比率失去焦点事件
    handlePercentBlur() {
      this.inputRangFocus = false;
    },
    // 偿还金额获取焦点事件
    handleRepayFocus() {
      this.repayNum = Number(this.repayNum);
      if (this.repayNum === 0) {
        this.repayNum = '';
      }
    },
    // 偿还金额失去焦点事件
    handleRepayBlur() {
      this.repayNum = toFixed(this.repayNum, 4);
    },
    handleToDetail() {
      this.$store.dispatch('setRepayDetail', {
        order: this.afterActionData.repayArr,
        repayNum: this.repayNum
      });
      this.$router.push({
        name: 'repayBill',
      })
    },
    // 余额点击事件
    handleClickBalance() {
      if (Number(this.balance) > Number(this.totalRepay)) {
        this.repayNum = this.totalRepay;
        return
      }
      this.repayNum = this.balance;
    },
    handleMaxUnstaked() {
      this.rangeValue = 150;
    },
    // 按钮点击验证
    handleReg() {
      if (!Number(this.repayNum)) { // 首次开仓账户 - 抵押数量不能为 0
        this.$toast('偿还数量必须大于 0 EOS')
        return false;
      }
      return true;
    },
    // 偿还USN
    handleBtnClick() {
      if (!this.handleReg()) {
        return
      }
      const memo = `repay:${this.inputRang * 100}`;
      const params = {
        code: 'usntoken1111',
        toAccount: 'usncontract1',
        quantity: `${this.repayNum} USN`,
        memo: memo,

        // tp 需要更多的参数
        tokenName: 'USN',
        precision: 4,
      }
      DApp.transfer(params, (err) => {
        if (err) {
          return
        }
        this.$router.push({
          name: '', // 跳转成功页面
        })
      })
      console.log(params); // eslint-disable-line
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~style/color.scss';
@import '~style/mixin.scss';

.ganage{
  @include flexbothSides();
  align-items: flex-start;
  background: $color-white;
  position: relative;

  .actions{
    width: 375px;
    max-width: 375px;
    margin: 36px 28px 85px 25px;
    font-size: 25px;

    .addStake{
      margin: 30px 0;
      display: flex;
      align-items: center;

      .checkboxDiv{
        display: flex;
        align-items: center;
        margin-right: 11px;
        height: 28px;
        width: 28px;
        border: 1px solid $color-input;
        border-radius: 3.89px;
        box-sizing: border-box;

        &.checked{
          border: 0px solid $color-input;
        }
      }
    }

    .actionItem{
      margin-bottom: 45px;

      &:first-child{
        margin-bottom: 20px;
      }

      &:last-child{
        margin-bottom: 0px;
      }
      .totalRepay{
        font-size: 32px;
        line-height: 45px;
        margin-top: 8px;
      }
      .inputDiv{
        margin: 20px 0 9px;
        height: 83px;
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
      .interest{
        background: $color-fafafa;
        height: 63px;
        border-radius: 5px;
        font-size: 21px;
        color: $color-999;
        padding: 0 29px;
        @include flexbothSides();

        .interestCount{
          margin-left: 62px;
        }

        .detail{
          color: $color-this;
        }
      }
      .balance{
        text-align: right;
        margin-top: 9px;
        color: $color-999;
      }

      .range{
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

            &.border-red{
              border-color: $color-red;
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
          background-color: $color-red;
        }
      }

      .percent{
        color: $color-999;
        margin-top: 16px;
        @include flexbothSides();
      }

      .reduceNum{
        margin: 21px 0 25px;
        font-size: 21px;
        height: 63px;
        width: 375px;
        background: $color-fafafa;
        padding: 0 29px;
        box-sizing: border-box;
        color: $color-999;
        @include flexbothSides();
      }
    }
  }
}

.btnDiv{
  .btn{
    margin: auto;
    @include btn(375px,80px,$color-red,$color-white,32px);
  }
}

</style>

<template>
  <div class="mainDiv">
    <div class="ganage">
      <!-- 服务暂停 -->
      <serve-stop v-if="false"/>

      <div class="actions">
        <!-- 抵押数量 首次开仓时现实 -->
        <div class="actionItem" v-if="firstOpen">
          <div class="title">抵押数量</div>
          <div class="inputDiv">
            <input type="number" v-model="stakeNum" @focus="handleStakeFocus" @blur="handleStakeBlur">
            <span>EOS</span>
          </div>
          <div class="balance" @click="handleClickBalance">余额：{{ balance }} EOS</div>
        </div>
        <!-- 抵押比率 -->
        <div class="actionItem">
          <div class="title">抵押比率</div>
          <div class="inputDiv">
            <input type="number" v-model="inputRang" @focus="handlePercentFocus" @blur="handlePercentBlur">
            <span>%</span>
          </div>
          <div class="range">
            <div class="desc">
              <span>
                <span class="before" @click="handleRangeSet(150)" :class="{'border-green': rangeValue >= 150}"></span>
              </span>
              <span>
                <span class="before" @click="handleRangeSet(225)" :class="{'border-green': rangeValue >= 225}"></span>
              </span>
              <span>
                <span class="before" @click="handleRangeSet(300)" :class="{'border-green': rangeValue >= 300}"></span>
              </span>
              <span>
                <span class="before" @click="handleRangeSet(400)" :class="{'border-green': rangeValue >= 400}"></span>
                <span class="last" @click.stop="handleRangeSet(500)" :class="{'border-green': rangeValue >= 500}"></span>
              </span>
            </div>
            <mt-range v-model="rangeValue" :min="150" :max="500" :step="1" :bar-height="5">
            </mt-range>
            <div class="percent">
              <span>150%</span>
              <span>300%</span>
              <span>500%</span>
            </div>
          </div>
        </div>
        <!-- 生成数量 -->
        <div class="actionItem">
          <div class="title">生成数量</div>
          <div class="inputDiv">
            <input type="number" v-model="generateNum" @focus="handleGenerateFocus" @blur="handleGenerateBlur">
            <span>USN</span>
          </div>
          <div class="balance" @click="handleMaxGenerateClick">最大可生成：{{ maxGenerateNum }} USN</div>
        </div>
        <!-- 增加抵押量 -->
        <div class="addStake" v-if="!firstOpen" @click="handleAddStake">
          <div class="checkboxDiv" :class="{'checked': showAddStake}">
            <svg-icon :icon="'checkbox'" :size="28" :svgClass="'color-green'" v-if="showAddStake"/>
          </div>
          <span>增加抵押量</span>
        </div>
        <!-- 抵押数量 勾选增加抵押量时显示 -->
        <div class="actionItem" v-if="showAddStake">
          <div class="inputDiv">
            <input type="number" v-model="stakeNum" @focus="handleStakeFocus" @blur="handleStakeBlur">
            <span>EOS</span>
          </div>
          <div class="balance" @click="handleClickBalance">余额：{{ balance }} EOS</div>
        </div>
        <div class="btnDiv">
          <div class="btn" @click="handleBtnClick">生成USN</div>
        </div>
      </div>
      <div>
        <after-action :type="'generate'" :afterActionData="afterActionData"/>
      </div>
    </div>
    <div>
      <Indicators />
    </div>
  </div>
</template>

<script>
import { toFixed } from '@/utils/public.js'
import { generateUsn } from '@/utils/logic.js'
import DApp from '@/utils/wallet';
import ServeStop from '@/components/ServeStop'
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
      stakeNum: '0.0000', // 抵押数量 - 4位小数
      rangeValue: 150, // 滑动条数值
      inputRang: '150.00', // 滑动条输入框数值
      generateNum: '0.0000', // 生成USN数量
      maxGenerateNum: '0.0000', // 最大可生成
      firstOpen: false, // 账户还未开仓
      showAddStake: false, // 开仓账户勾选增加抵押量 - 默认不勾选
      inputStakeFocus: false, // 新增抵押数量选中
      inputRangFocus: false, // 抵押比率输入框选中 - 默认未选中
      inputGenerateFocus: false, // 抵押比率输入框选中 - 默认未选中
      afterActionData: {}, // 操作后数据
      balance: '1000.0000',
    }
  },
  mounted() {
    this.afterActionData = this.userData;
  },
  watch: {
    rangeValue(newVal) { // 滑动滑动条
      if (this.inputRangFocus) {
        return;
      }
      this.inputRang = toFixed(newVal, 2);
    },
    // 输入抵押数量 - 计算生成数量
    stakeNum() {
      this.handleDealGenerateNum('num');
    },
    // 输入抵押比率 - 计算生成数量
    inputRang() {
      if (this.inputGenerateFocus) {
        return;
      }
      this.handleDealGenerateNum('num');
    },
    // 输入生成数量 - 计算抵押比率
    generateNum() {
      if (this.inputRangFocus || this.inputStakeFocus) {
        return;
      }
      this.handleDealGenerateNum('percent');
    }
  },
  methods: {
    // 计算生成数量
    handleDealGenerateNum(type) {
      const inData = {
        allStaked: this.userData.allStaked,
        allGenerate: this.userData.allGenerate,
        allInterest: this.userData.interestNum,
        eosPrice: this.userData.eosPrice,
        newStaked:this.stakeNum,
        newPercent: this.inputRang,
        newGenerate: this.generateNum,
        type: type,
      }
      const outData = generateUsn(inData)
      console.log(outData); // eslint-disable-line
      this.maxGenerateNum = outData.newMaxGenerate;
      this.afterActionData = outData;
      // 在抵押数量 || 抵押比率输入时
      if (this.inputRangFocus || this.inputStakeFocus) {
        this.rangeValue = outData.rangPercent;
        this.generateNum = outData.newGenerate;
        return;
      }
      // 输入生成数量时
      if (this.inputGenerateFocus) {
        this.rangeValue = outData.rangPercent;
        return;
      }
      // // 滑块滑动时
      this.rangeValue = outData.rangPercent;
      this.inputRang = outData.percent;
      this.generateNum = outData.newGenerate;
    },
    // 百分比点击
    handleRangeSet(index) {
      this.inputRang = index;
      this.rangeValue = index;
    },
    // 抵押数量获取焦点事件
    handleStakeFocus() {
      this.inputStakeFocus = true;
      this.stakeNum = Number(this.stakeNum);
      if (this.stakeNum === 0) {
        this.stakeNum = '';
      }
    },
    // 抵押数量获取焦点事件
    handleStakeBlur() {
      this.inputStakeFocus = false;
      this.stakeNum = toFixed(this.stakeNum, 4);
    },
    // 抵押比率获取焦点事件
    handlePercentFocus() {
      this.inputRangFocus = true;
      this.inputRang = Number(this.inputRang);
      if (this.inputRang === 0) {
        this.inputRang = '';
      }
    },
    // 抵押比率失去焦点事件
    handlePercentBlur() {
      this.inputRangFocus = false;
      if (Number(this.inputRang) <= 150) {
        this.inputRang = toFixed(150, 2);
        this.rangeValue = 150;
        return;
      }
      if (Number(this.inputRang) >= 500) {
        this.rangeValue = 500;
        return;
      }
      this.inputRang = toFixed(this.inputRang, 2)
      this.rangeValue = Number(this.inputRang);
    },
    // 滑块控制
    handleRegPercent(percent) {
      if (Number(percent) <= 150) {
        return 150;
      }
      if (Number(percent) >= 500) {
        return 500;
      }
      return Number(percent);
    },
    // 生成数量获取焦点事件
    handleGenerateFocus() {
      this.inputGenerateFocus = true;
      this.generateNum = Number(this.generateNum);
      if (this.generateNum === 0) {
        this.generateNum = '';
      }
    },
    // 生成数量失去焦点事件
    handleGenerateBlur() {
      this.inputGenerateFocus = false;
      this.generateNum = toFixed(this.generateNum, 4);
    },
    // 最大生成数量点击事件
    handleMaxGenerateClick() {
      this.generateNum = this.maxGenerateNum;
      this.rangeValue = 150;
    },
    // 余额点击事件
    handleClickBalance() {
      this.stakeNum = this.balance;
    },
    // 增加抵押量
    handleAddStake() {
      this.showAddStake = !this.showAddStake;
      this.stakeNum = '';
    },
    // 按钮点击验证
    handleReg() {
      if ((this.firstOpen || this.showAddStake) && !Number(this.stakeNum)) { // 首次开仓账户 - 抵押数量不能为 0
        this.$toast('抵押数量必须大于 0 EOS')
        return false;
      }
      if (Number(this.generateNum) < 1) {
        this.$toast('生成数量必须大于等于 1 USN')
        return false;
      }
      return true;
    },
    // 生成USN
    handleBtnClick() {
      if (!this.handleReg()) {
        return
      }
      if (Number(this.stakeNum)) {
        this.handleAddToGenerate();
        return;
      }
      // 降低抵押比率生成USN
      this.handleReduceToGenerate();
    },
    // 增加抵押量生成USN
    handleAddToGenerate() {
      const memo = `issue:${this.inputRang * 100}`;
      const params = {
        code: 'eosio.token',
        toAccount: 'usncontract1',
        quantity: `${this.stakeNum} EOS`,
        memo: memo,

        // tp 需要更多的参数
        tokenName: 'EOS',
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
    // 降低抵押比率生产USN
    handleReduceToGenerate() {
      const params = {
        percent: this.inputRang * 100
      }
      DApp.generateUsn(params, (err) => {
        if (err) {
          return
        }
        this.$router.push({
          name: '', // 跳转成功页面
        })
      })
    }
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
    margin: 36px 28px 48px 25px;
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
      margin-bottom: 50px;

      &:nth-child(3),
      &:nth-child(4){
        margin-bottom: 32px;
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
  }
}

.btnDiv{
  .btn{
    margin: auto;
    @include btn(375px,80px,$color-green,$color-white,32px);
  }
}

</style>

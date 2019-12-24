<template>
  <div class="mainDiv">
    <div class="ganage">
      <div class="actions">
        <!-- 操作类型 start -->
        <div class="actionItem">
          <div class="title">操作类型</div>
          <div class="chooseAction">
            <div :class="{'add': type === 'add'}" @click="type = 'add'">增加抵押量</div>
            <div :class="{'reduce': type !== 'add'}" @click="type = 'reduce'">减少抵押量</div>
          </div>
        </div>
        <!-- 操作类型 end -->
        <div class="position" v-if="type === 'add'">
          <!-- 服务暂停 -->
          <serve-stop v-if="false" />
          <!-- 增加数量 start -->
          <div class="actionItem">
            <div class="title">增加数量</div>
            <div class="inputDiv">
              <input type="number" v-model="stakeNum" @focus="handleFocus" @blur="handleBlur">
              <span>EOS</span>
            </div>
            <div class="balance" @click="handleClickBalance">余额：{{ balance }} EOS</div>
          </div>
          <div class="actionItem btnDiv">
            <div class="btn" @click="handleBtnClick">增加抵押量</div>
          </div>
          <!-- 增加数量 end -->
        </div>

        <!-- 减少 -->
        <div class="position" v-else>
          <!-- 服务暂停 -->
          <serve-stop v-if="false" />
          <!-- 增加数量 start -->
          <div class="actionItem">
            <div class="title">减少数量</div>
            <div class="inputDiv">
              <input type="number" v-model="stakeNum" @focus="handleFocus" @blur="handleBlur">
              <span>EOS</span>
            </div>
            <div class="balance" @click="handleClickBalance">最大可减少：{{ maxReduce }} EOS</div>
          </div>
          <div class="actionItem btnDiv">
            <div class="btn bgcolor-red" @click="handleBtnClick">减少抵押量</div>
          </div>
          <!-- 增加数量 end -->
        </div>
      </div>
      <div>
        <after-action :type="type" :afterActionData="afterActionData" />
      </div>
    </div>
    <div>
      <Indicators />
    </div>
    <!-- <div class="btnDiv">
      <div class="btn" v-if="type === 'add'">增加抵押量</div>
      <div class="btn bgcolor-red" v-else>减少抵押量</div>
    </div> -->
  </div>
</template>

<script>
import { toFixed } from '@/utils/public.js';
import { manageStake } from '@/utils/logic.js';
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
      type: 'add',
      stakeNum: '',
      afterActionData: {},
      balance: '100000.0000',
      maxReduce: '100.0000',
    }
  },
  mounted() {
    this.afterActionData = this.userData;
  },
  watch: {
    type() {
      this.stakeNum = '';
      this.handleDealManage();
    },
    stakeNum() {
      this.handleDealManage();
    }
  },
  methods: {
    handleDealManage() {
      const inData = {
        allStaked: this.userData.allStaked,
        allGenerate: this.userData.allGenerate,
        allInterest: this.userData.interestNum,
        eosPrice: this.userData.eosPrice,
        stakeNum: this.stakeNum,
        type: this.type,
      }
      const outData = manageStake(inData)
      this.afterActionData = outData;
      this.maxReduce = outData.maxUnstakedNum;
    },
    handleFocus() {
      this.stakeNum = Number(this.stakeNum);
      if (!this.stakeNum) {
        this.stakeNum = '';
      }
    },
    handleBlur() {
      this.stakeNum = toFixed(this.stakeNum, 4);
    },
    // 余额点击事件
    handleClickBalance() {
      if ( this.type !== 'add') {
        this.stakeNum = this.maxReduce;
        return
      }
      this.stakeNum = this.balance;
    },
    // 按钮点击验证
    handleReg() {
      if (this.type === 'add' && Number(this.stakeNum) < 1) { // 首次开仓账户 - 抵押数量不能为 0
        this.$toast('增加抵押量必须大于等于 1 EOS')
        return false;
      }
      if (this.type === 'add' && Number(this.stakeNum) > Number(this.balance)) { // 首次开仓账户 - 抵押数量不能为 0
        this.$toast('余额不足')
        return false;
      }
      if (this.type !== 'add' && !Number(this.stakeNum)) { // 首次开仓账户 - 抵押数量不能为 0
        this.$toast('减少抵押量必须大于等于 0 EOS')
        return false;
      }
      if (this.type !== 'add' && Number(this.stakeNum) > Number(this.maxReduce)) {
        this.$toast('抵押量不足')
        return false;
      }
      return true;
    },
    // 管理
    handleBtnClick() {
      if (!this.handleReg()) {
        return
      }
      if (this.type === 'add') {
        this.handleAddStake();
        return;
      }
      this.handleReduceStake();
    },
    // 增加抵押量
    handleAddStake() {
      const params = {
        code: 'eosio.token',
        toAccount: 'usncontract1',
        quantity: `${this.stakeNum} EOS`,
        memo: 'deposit',

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
    },
    // 减少抵押量
    handleReduceStake() {
      const params = {
        quantity: `${this.stakeNum} EOS`,
      }
      DApp.manageStake(params, (err) => {
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
@import '~style/color.scss';
@import '~style/mixin.scss';

.ganage{
  @include flexbothSides();
  align-items: flex-start;
  background: $color-white;

  .position{
    position: relative;
  }

  .actions{
    width: 375px;
    max-width: 375px;
    margin: 36px 28px 85px 25px;
    font-size: 25px;

    .actionItem{
      margin-bottom: 63px;

      &:last-child{
        margin-bottom: 0px;
      }

      .chooseAction{
        @include flexbothSides();
        margin-top: 21px;
        &>div{
          width: 183px;
          height: 83px;
          box-sizing: border-box;
          border: 1px solid $color-input;
          border-radius: 10px 0px 0px 10px;
          color: $color-999;
          @include flexCenter();

          &:last-child{
            border-radius: 0px 10px 10px 0px;
          }
        }

        .add{
          border: 1px solid $color-green;
          border-radius: 10px 0px 0px 10px;
          color: $color-green;
        }
        .reduce{
          border: 1px solid $color-red;
          border-radius: 0px 10px 10px 0px;
          color: $color-red;
        }
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
    }
  }
}

.btnDiv{
  padding: 22px 0px;
  .btn{
    margin: auto;
    @include btn(375px,84px,$color-green,$color-white,32px);
  }
}

</style>

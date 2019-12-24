<template>
  <div>
    <div class="orderDiv">
      <div class="timeDiv">
         <svg-icon :icon="'shoucan'" :size="45"/>
       <div class="time1" @click="openPicker(false)">{{ beginTime || '开始时间' }}</div>
       <span>至</span>
       <div class="time2" @click="openPicker(true)">{{ endTime || '结束时间' }}</div>
      </div>
      <div class="seach">查询</div>
    </div>
    <div class="listDiv">
      <div class="list" v-for="(item, index) in 2" :key="index">
        <div class="title">
          <div>2019-10-27   10:36:01</div>
          <div>3.1234 USN</div>
        </div>
        <div class="debtData">
            <div>
              <div class="subTitle">
                <span>Coinbanse价格</span>
              </div>
              <div class="num">3.1234 USN</div>
            </div>
            <div>
              <div class="subTitle">
                <span>Bitfine价格</span>
              </div>
              <div class="num">1234 EOS</div>
            </div>
            <div>
              <div class="subTitle">
                <span>Binance价格</span>
              </div>
              <div class="num">156.1234 EOS</div>
            </div>
            <div>
              <div class="subTitle">
                <span>Huobi</span>
              </div>
              <div class="num">126.1234 EOS</div>
            </div>
            <div>
              <div class="subTitle">
                <span>OKEX价格</span>
              </div>
              <div class="num">126.1234 EOS</div>
            </div>
        </div>
       </div>
    </div>
    <!-- 日历控件 -->
     <div class="date">
      <mt-datetime-picker
        ref="picker"
        v-model="pickerVisible"
        type="date"
        @confirm="handleConfirm"
        :startDate="startDate"
        :endDate="endDate"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}">
      </mt-datetime-picker>
    </div>
  </div>
</template>
<script>
import { toLocalTime } from '@/utils/public';
// import OrderSearch from '../components/OrderSearch'

export default {
  // components:{
  //   OrderSearch
  // },
  data() {
    return {
      // 组件 时间范围
      startDate: new Date('2019/01/01'),
      endDate: new Date(),
      pickerVisible: new Date(),
      beginTime: '',
      endTime: '',
      inputEndDate: false //标示开始时间
    }
  },
  methods: {
    openPicker(boolean) {
      // 判断开始时间或者结束时间
      this.inputEndDate = boolean
      this.$refs.picker.open();
    },
      // 选择日历时间
    handleConfirm() {
      const str = toLocalTime(this.pickerVisible, 10);
      if (!this.inputEndDate) {
        this.beginTime = str
        return;
      }
      // 结束时间小于开始时间
      if(this.beginTime && this.beginTime>str){
        const endTime = this.beginTime
        this.beginTime = str
        this.endTime = endTime
        return
      }
      this.endTime = str
    },
  }
}
</script>
<style lang="scss" scoped>
// <!-- 日历控件 -->
.date{
  /deep/ .mint-datetime-cancel{
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
  }

  /deep/ .mint-datetime-confirm{
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
  .orderDiv {
    @include flexbothSides;
    padding: 0 25px;
    box-sizing: border-box;
    font-size: 28px;
    color: #999999;
    height: 100px;
    .timeDiv{
      display: flex;
      align-items: center;
      height: 68px;
      flex: 1;
      background: #FFFFFF;
      border-radius: 34px;
      padding: 0 34px;
      span{
        padding: 0 30px;
      }
      .time1{
        margin-left: 60px;
      }
    }
    .seach{
      margin-left: 16px;
      background: #FFFFFF;
      border: 1px solid #32AF8D;
      border-radius: 20px;
      padding: 13px 28px;
    }
  }
  .list{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 9px;
    .title{
      @include flexbothSides;
      height: 78px;
      align-items: center;
      margin: 0 25px;
      border-bottom: 2px solid #eee;
      font-size: 25px;
      color: #333333;
    }
  }
  .debtData {
    display: flex;
    flex-wrap: wrap;
    padding: 22px 25px 0 0;
    // border-bottom: 2px solid #C7C7C7;
    & > div {
      width: 33.33%;
      // margin-bottom: 25px;
      padding: 0 0 25px 25px;
      box-sizing: border-box;
    }
    .subTitle{
      font-size: 25px;
      color: #999999;
      margin-bottom: 5px;
    }
    .num{
      font-size: 28px;
      color: #333333;
      @include ellipsis;
    }
  }

</style>
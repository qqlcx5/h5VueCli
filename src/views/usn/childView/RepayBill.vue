<template>
  <div>
    <div class="alertDiv">
      <div>本次偿还{{ order.length }}笔订单</div>
      <div>总额：{{ repayNum }} USN</div>
    </div>
    <div class="listDiv">
      <div class="list" v-for="(item, index) in order" :key="index">
        <div class="title">
          <div>2019-12-12 10:10:10</div>
          <div><span>生成：</span>{{item.generate}}USN </div>
        </div>
        <div class="debtData">
            <div>
              <div class="subTitle">
                <span>待还金额</span>
                <span>(USN)</span>
                <!-- <span class="detail">明细</span> -->
              </div>
              <div class="num">{{item.generate}}</div>
            </div>
            <div></div>
            <div>
              <div class="subTitle">
                <span>本次偿还金额</span>
                <span>(USN)</span>
              </div>
              <div class="num">{{item.itemPrincipal}}</div>
            </div>
            <div>
              <div class="subTitle">
                <span>本次偿还利息</span>
                <span>(USN)</span>
              </div>
              <div class="num">{{item.itemInterest}}</div>
            </div>
        </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: [],
      repayNum: '0.0000',
    }
  },
  mounted() {
    this.repayNum = this.$store.state.app.repayDetail.repayNum || '0.0000';
    this.order = this.$store.state.app.repayDetail.order || [];
    console.log(this.$store.state.app.repayDetail); // eslint-disable-line
    if (!this.order.length) {
      this.$router.replace({
        name: 'actionForUsn',
        params: {
          active: 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .alertDiv {
    @include flexbothSides;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 28px;
    color: #FFFFFF;
    height: 144px;
    background: $color-green;
  }
  .list{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 9px;
    .title{
      display: flex;
      height: 78px;
      align-items: center;
      margin: 0 25px;
      border-bottom: 2px solid #eee;
      font-size: 25px;
      color: #333333;
      span{
        font-size: 25px;
        color: #9B9B9B;
      }
      & > div {
      width: 50%;
      // margin-bottom: 46px;

      &:nth-child(2n) {
        box-sizing: border-box;
        padding-left: 50px;
        }
      }
    }
  }
  .debtData {
    display: flex;
    flex-wrap: wrap;
    padding: 31px 25px 14px;
    // border-bottom: 2px solid #C7C7C7;
    & > div {
      width: 50%;
      margin-bottom: 46px;

      &:nth-child(2n) {
        box-sizing: border-box;
        padding-left: 50px;
      }
    }
    .subTitle{
      font-size: 25px;
      color: #999999;
      margin-bottom: 10px;
      .detail{
        margin-left: 25px;
        font-size: 24px;
        color: $color-this;
      }
    }
    .num{
      font-size: 28px;
      color: #333333;
      @include ellipsis;
    }
  }

</style>
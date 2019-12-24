<template>
  <div>
    <div class="alertDiv">
      <div>本次偿还12笔订单</div>
      <div>总额：1234.1234 USN</div>
    </div>
    <div class="listDiv">
      <div class="item" v-for="(item, index) in 2" :key="index">
        <div class="title">
          <div>生成USN</div>
          <div class="color-add">
            <span>数量：</span> 123213 USN
          </div>
        </div>
        <div class="debtData">
          <div>
            <div class="subTitle">
              <span>抢拍数量</span>
            </div>
            <div class="num">123456.1234 EOS</div>
          </div>
          <div>
            <div class="subTitle">
              <span>抢拍数量</span>
            </div>
            <div class="num">123456.1234 EOS</div>
          </div>
          <div>
            <div class="subTitle">
              <span>抢拍数量</span>
            </div>
            <div class="num">123456.1234 EOS</div>
          </div>
          <div>
            <div class="subTitle">
              <span>抢拍数量</span>
            </div>
            <div class="num">123456.1234 EOS</div>
          </div>
          <div>
            <div class="subTitle">
              <span>操作时间</span>
            </div>
            <div class="num">2019-10-27 10:36:01</div>
          </div>
          <div>
            <div class="subTitle">
              <span>抢拍数量</span>
            </div>
            <div class="num color-this">jdisfahisehiehahsi…</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.alertDiv {
  @include flexbothSides;
  padding: 0 30px;
  box-sizing: border-box;
  font-size: 28px;
  color: #ffffff;
  height: 144px;
  background: $color-green;
}
.listDiv {
  .noItem {
    display: flex;
    height: 78px;
    align-items: center;
    padding: 0 25px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 25px;
    color: $color-green;
    margin-bottom: 9px;
    & > div {
      width: 50%;
      &:nth-child(2n) {
        box-sizing: border-box;
        padding-left: 50px;
      }
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 9px;
    // border-bottom: 9px solid #f3f3f3;
    // &:last-child{
    //   border-bottom: none;
    // }
    .title {
      display: flex;
      height: 78px;
      align-items: center;
      margin: 0 25px;
      border-bottom: 2px solid #eee;
      font-size: 25px;
      color: $color-green;
      span {
        font-size: 25px;
        color: #9b9b9b;
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
    .subTitle {
      font-size: 25px;
      color: #999999;
      margin-bottom: 10px;
      .detail {
        margin-left: 25px;
        font-size: 24px;
        color: $color-this;
      }
    }
    .num {
      font-size: 28px;
      color: #333333;
      @include ellipsis;
    }
  }
}
</style>
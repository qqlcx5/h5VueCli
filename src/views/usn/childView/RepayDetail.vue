<template>
  <div>
     <header>
      <div class="item">
        <span class="name">生成时间</span>
        <span class="num">2323456.1234</span>

        <span class="name mt26">待还数量 <span class="chain">(USN)</span></span>
        <span class="num">2323456.1234</span>
      </div>
      <div class="item">
        <span class="name">生成数量<span class="chain">(USN)</span></span>
        <span class="num">2323456.1234</span>
        <span class="name mt26">待还利息<span class="chain">(USN)</span></span>
        <span class="num">2323456.1234</span>
      </div>
    </header>
    <div class="listDiv">
      <div class="subTitle">偿还记录</div>
      <div class="item" v-for="(item, index) in 4" :key="index">
        <div class="time">
          <span>2019-10-27</span>
          <span>10:36:01</span>
        </div>
        <div class="info">
          <span class="name">偿还 254345.1234 USN</span>
          <span>含利息0.0003 USN</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// @import "../../../assets/css/public.scss";
// @import "../../../assets/css/mixin.scss";
  header{
    display: flex;
    padding: 33px 0;
    color: #FFFFFF;
    background: $color-green;
    .item{
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 24px;
      color: #FFFFFF;
      padding-left: 36px;
      .name{
        font-size: 24px;
        color: #FFFFFF;
        margin-bottom: 11px;
        &.mt26{
          margin-top: 26px;
        }
      }
      .chain{
        font-size: 21px;
      }
      .num{
        margin-top: 2px;
        font-size: 30px;
      }
    }
  }
  .listDiv{
    .subTitle{
      height: 75px;
      padding-left: 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: #f3f3f3;
    }
    .item{
      padding: 32px 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-bottom: 10px solid #f3f3f3;
      &:last-child{
        border-bottom: none;
      }
      .time{
        font-size: 25px;
        width: 190px;
        height: 96px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: right;
        color: #333333;
        padding-right: 24px;
        box-sizing: border-box;
        border-right: 2px solid #C7C7C7;
        span:first-child{
          margin-bottom: 6px;
        }
      }
      .info{
        flex: 1;
        padding-left: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 25px;
        color: #999999;
        .name{
          font-size: 28px;
          color: $color-green;
          margin-bottom: 8px;
        }
      }

    }
  }

</style>
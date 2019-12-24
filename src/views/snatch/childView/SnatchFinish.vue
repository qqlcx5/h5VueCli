<template>
  <div>
    <div class="alertDiv">
      <div>抢拍完成</div>
      <div>2019-10-27  10:36:01</div>
    </div>
     <div class="acountDiv">
       <div class="infoDiv">
         <div class="row">
          <div class="name">抢拍价格</div>
          <div class="num">2.1234 USN/EOS</div>
        </div>
         <div class="row">
          <div class="name">成交数量</div>
          <div class="num">2.1234 USN/EOS <span class="detail">明细</span> </div>
        </div>
         <div class="row">
          <div class="name">剩余可拍</div>
          <div class="num">2.1234 USN/EOS</div>
        </div>
         <div class="row">
          <div class="name">剩余可拍</div>
          <div class="num">2.1234 USN/EOS</div>
        </div>
       </div>
       <div class="infoDiv">
         <div class="row">
          <div class="name">成交均价</div>
          <div class="num">2.1234 USN/EOS</div>
        </div>
         <div class="row">
          <div class="name">成交均价</div>
          <div class="num">2.1234 USN/EOS <span class="detail">明细</span> </div>
        </div>
       </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .alertDiv {
    @include flexbothSides;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 30px;
    color: #FFFFFF;
    height: 120px;
    background: $color-green;
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
    .name{width: 160px;}
    .num{
      flex: 1;
      font-size: 28px;
      color: #333333;}
    .infoDiv{
      padding: 37px 0 18px;
       border-bottom: 2px solid #C7C7C7;
      &:last-child{
        border-bottom: none;
      }
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

</style>
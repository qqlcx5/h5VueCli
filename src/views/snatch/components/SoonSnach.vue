<template>
  <div class="mySnatch">
    <div class="alertDiv">
      <div>及时获取爆仓订单的抢拍提醒 ></div>
      <div>x</div>
    </div>
     <div class="exponentDiv">
      <span>EOS价格指数</span>
      <span class="color-add">3.2324 USN</span>
    </div>
    <div class="newList">
        <div class="lists">
          <div class="list" v-for="(item, $index) in 2" :key="$index">
            <div class="acount">
              aaa***bbb
            </div>
            <div>
              <div class="name">爆仓数量</div>
              <div class="name">爆仓价格(EOS)</div>
            </div>
            <div>
              <div class="num">123456.1234 <span>EOS</span></div>
              <div class="num color-green">3.1234 USN</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "mySnatch",
  data() {
    return {};
  },
  methods: {}
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
            padding: 24px 0 19px;
            font-size: 30px;
            color: #333333;
        }
        & > div {
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:last-child {
            margin-top: 11px;
          }

          .name {
            font-size: 25px;
            color: $color-999;
          }
          .num {
            font-size: 28px;
            color: #333333;
            span{
              font-size: 21px;
              color: #151515;
            }
          }

        }
      }
    }
  }

 </style>

<template>
  <div class="pages">
    <header>
      <span class="iconfont icon-huaban25 back"></span>
      <span>抢拍成功</span>
    </header>

    <div class="contentDiv" >
      <div class="content" >
        <img src="@/assets/img/success/success.png" alt="">
        <p>抢拍成功</p>
        <div class="volumeDiv">
          <span class="name">成交数量</span>
          <span class="num">123420.0021 EOS</span>
        </div>
        <div class="volumeDiv">
          <span class="name">成交金额</span>
          <span class="num">1.0021 EOS</span>
        </div>
      </div>
      <div class="sureBtn" @click="handleToBill">查看订单</div>
      <div class="backBtn" @click="handleToBack">返回</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // type 1认证成功， 2审核成功
      type: 1,
      biz_token: '',
      status: false,
      loading: true,
      callbackData: null,
      isError: null,
    }
  },
  methods:{
    handleToBill(){
      this.$router.push({name:'snatchFinish'})
    },
    handleToBack(){
      this.$router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>
.pages{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  header{
    @include flexCenter;
    padding: 20px 24px;
    font-size: 36px;
    background: #FFF;
    position: relative;
    border-bottom: 12px solid $color-f3f3f3;
    .back{
      position: absolute;
      top: 50%;
      left: 24px;
      transform: translate(0, -50%);
      font-size: 30px;
    }
  }
  .contentDiv{
    flex:1;
    padding: 0 46px;
    box-sizing: border-box;
    background-color: #fff;
    .content{
      @include flexCenter;
      flex-direction: column;
      img{
        margin: 100px 0 28px;
        width: 110px;
        height: 110px;
        border-radius: 50%;
      }
      p{
        font-size: 28px;
        margin-bottom: 43px;
        color: $color-333;

      }
      .volumeDiv{
        display: flex;
        width: 100%;
        margin-bottom: 14px;
        .name{
          width: 292px;
          text-align: right;
          font-size: 25px;
          color: #999999;
        }
        .num{
          margin-left: 35px;
          font-size: 25px;
          color: $color-333;
        }
      }
    }
    .sureBtn{
      @include btn( 100%, 84px,$color-green, #fff, 32px);
      margin: 97px 0 21px;
    }
    .backBtn{
      @include btn( 100%, 84px,#fff, $color-green, 32px);
      border: 2px solid #32AF8D;
      box-sizing: border-box;
    }
  }
}

</style>

<template>
  <div class="pages">
    <header>
      <span class="iconfont icon-huaban25 back"></span>
      <span >设置</span>
    </header>

    <div class="contentDiv">
      <div class="row">
        <!-- <div class="name">邮箱</div> -->
        <input type="text" class="disabled" placeholder="请输入邮箱地址">
      </div>
       <div class="row">
        <!-- <div class="name">验证码</div> -->
        <input type="text" placeholder="请输入验证码">
        <div class="sendBtn">发送验证码</div>
      </div>
      <div class="sureBtn" @click="handleToSuccess">确定</div>
    </div>
  </div>
</template>

<script>


export default {
  data(){
    return{
    }
  },
  methods:{
    handleToSuccess(){
      this.$router.push({name:'emailSuccess'})
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
    width: 100%;
    padding: 46px 46px 0;
    box-sizing: border-box;
    background-color: #fff;
    .row{
      display: flex;
      align-items: center;
      margin-bottom: 52px;
      .name{
        min-width: 96px;
        width: 96px;
        font-size: 32px;
        color: #4A4A4A;
        text-align-last:justify;
        margin-right: 50px;

      }
      input{
        flex:1;
        height: 80px;
        min-width: 280px;
        background: #FFFFFF;
        border: 1px solid #C7C7C7;
        border-radius: 7px;
        padding-left: 25px;
        font-size: 32px;
        color: $color-999;
      }
      .disabled{
        background: #F3F3F3;
        font-size: 30px;
        color: $color-999;
      }
      .sendBtn{
        @include btn( 200px, 80px,#fff, $color-green, 24px);
        border: 1px solid $color-green;
        box-sizing: border-box;
        margin-left: 10px;
        border-radius: 7px;
      }

    }
    .sureBtn{
      @include btn( 100%, 84px,$color-green, #fff, 32px);
      border-radius: 10px;
    }
  }
}

</style>
